"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const readable_stream_1 = require("readable-stream");
const info_1 = require("./info");
const buffer_2 = require("./buffer");
const packet_1 = require("./packet");
const table_1 = require("./table");
const eit_1 = require("./table/eit");
const bit_1 = require("./table/bit");
class TsStream extends readable_stream_1.Transform {
    buffer;
    info = {};
    options;
    trans;
    constructor(options = {}) {
        super();
        this.options = Object.assign({
            transform: false,
            skipSize: 0,
            packetSize: 188,
            bufferSize: 0,
            transPmtIds: [],
            transPmtSids: [],
            transPmtPids: [],
            transPids: []
        }, options);
        this.buffer = new buffer_2.TsBuffer();
        this.info = {};
        this.trans = {
            pat: null,
            cat: null,
            pmt: {},
            pmtPids: [],
            pids: [],
            rebuild: {
                pat: null,
                patCounter: 0,
                patVersion: 0
            }
        };
    }
    toPacket(buffer) {
        let packets = [];
        let i = 0;
        if (this.options.packetSize === 192) {
            for (; buffer.length - i >= 192; i += 192) {
                if (buffer[4] !== 0x47 && (i = buffer.indexOf(0x47, i) - 4) === -5)
                    break;
                packets.push(buffer.slice(i + 4, i + 192));
            }
        }
        else {
            for (; buffer.length - i >= 188; i += 188) {
                if (buffer[0] !== 0x47 && (i = buffer.indexOf(0x47, i)) === -1)
                    break;
                packets.push(buffer.slice(i, i + 188));
            }
        }
        return {
            packets: packets,
            buffer: i !== -1 ? buffer.slice(i) : null
        };
    }
    parse(buffer) {
        let result = this.toPacket(buffer);
        for (let packet of result.packets) {
            if (this.options.skipSize > 0 && this.options.skipSize-- !== 0)
                continue;
            let tsPacket = new packet_1.default(packet);
            let objBasic = tsPacket.decodeBasic();
            if (objBasic.transport_error_indicator === 1)
                continue;
            if (!this.info.hasOwnProperty(objBasic.PID)) {
                this.info[objBasic.PID] = new info_1.TsInfo();
            }
            let info = this.info[objBasic.PID];
            info.packet++;
            if (this.listenerCount("packet")) {
                this.emit("packet", objBasic.PID, tsPacket.decode());
            }
            if ((objBasic.adaptation_field_control & 0x01) === 1) {
                let sections = [];
                if (objBasic.hasOwnProperty("adaptation_field") &&
                    objBasic.adaptation_field.discontinuity_indicator === 1) {
                    info.counter = -1;
                }
                if (info.counter !== -1 && objBasic.PID !== 0x1FFF) {
                    let counter = objBasic.continuity_counter;
                    let previous = info.counter;
                    let expected = (previous + 1) & 0x0F;
                    let check = true;
                    if (counter === previous) {
                        info.duplication++;
                        if (info.duplication > 1) {
                            check = false;
                        }
                    }
                    else {
                        info.duplication = 0;
                        if (counter !== expected) {
                            check = false;
                        }
                    }
                    if (!check) {
                        info.drop++;
                        info.type = 0;
                        info.buffer.reset();
                        if (this.listenerCount("drop")) {
                            this.emit("drop", objBasic.PID, counter, expected);
                        }
                    }
                }
                info.counter = objBasic.continuity_counter;
                if (objBasic.transport_scrambling_control >> 1 === 1) {
                    info.scrambling++;
                    if (this.listenerCount("scrambling")) {
                        this.emit("scrambling", objBasic.PID);
                    }
                }
                else {
                    if (objBasic.payload_unit_start_indicator === 1) {
                        if (packet_1.default.isPes(packet)) {
                            info.type = 1;
                        }
                        else {
                            info.type = 2;
                            let data = packet_1.default.getData(packet);
                            let bytesRead = 0;
                            let pointerField = data[0];
                            bytesRead++;
                            if (pointerField !== 0 && info.buffer.length !== 0) {
                                if (info.buffer.entireLength - info.buffer.length === pointerField) {
                                    info.buffer.add(data.slice(bytesRead, bytesRead + pointerField));
                                    sections.push(info.buffer.concat());
                                }
                                else {
                                    info.type = 0;
                                }
                            }
                            if (info.buffer.length !== 0) {
                                info.buffer.reset();
                                info.buffer.entireLength = 0;
                            }
                            bytesRead += pointerField;
                            while (data.length >= bytesRead + 3 && data[bytesRead] !== 0xFF) {
                                let sectionLength = 3 + ((data[bytesRead + 1] & 0x0F) << 8 | data[bytesRead + 2]);
                                if (data.length < bytesRead + sectionLength) {
                                    info.buffer.add(data.slice(bytesRead, data.length));
                                    info.buffer.entireLength = sectionLength;
                                    break;
                                }
                                sections.push(data.slice(bytesRead, bytesRead + sectionLength));
                                bytesRead += sectionLength;
                            }
                        }
                    }
                    else {
                        if (info.type === 1) {
                        }
                        else if (info.type === 2) {
                            if (info.buffer.length !== 0) {
                                let data = packet_1.default.getData(packet);
                                let restLength = info.buffer.entireLength - info.buffer.length;
                                if (data.length < restLength) {
                                    info.buffer.add(data);
                                }
                                else {
                                    info.buffer.add(data.slice(0, restLength));
                                    sections.push(info.buffer.concat());
                                    info.buffer.reset();
                                    info.buffer.entireLength = 0;
                                }
                            }
                        }
                    }
                    for (let section of sections) {
                        let tableId = section[0];
                        if (tableId === 0x00) {
                            if (this.listenerCount("pat") || this.options.transform) {
                                let objPat = new table_1.TsTablePat(section).decode();
                                if (objPat !== null) {
                                    if (this.listenerCount("pat")) {
                                        this.emit("pat", objBasic.PID, objPat);
                                    }
                                    if (this.options.transform) {
                                        this.parsePat(objBasic.PID, objPat);
                                        this.push(this.createPat());
                                    }
                                }
                            }
                        }
                        else if (tableId === 0x01) {
                            if (this.listenerCount("cat") || this.options.transform) {
                                let objCat = new table_1.TsTableCat(section).decode();
                                if (objCat !== null) {
                                    if (this.listenerCount("cat")) {
                                        this.emit("cat", objBasic.PID, objCat);
                                    }
                                    if (this.options.transform) {
                                        this.parseCat(objBasic.PID, objCat);
                                    }
                                }
                            }
                        }
                        else if (tableId === 0x02) {
                            if (this.listenerCount("pmt") || this.options.transform) {
                                let objPmt = new table_1.TsTablePmt(section).decode();
                                if (objPmt !== null) {
                                    if (this.listenerCount("pmt")) {
                                        this.emit("pmt", objBasic.PID, objPmt);
                                    }
                                    if (this.options.transform) {
                                        this.parsePmt(objBasic.PID, objPmt);
                                    }
                                }
                            }
                        }
                        else if (tableId >= 0x3A && tableId <= 0x3F) {
                            if (this.listenerCount("dsmcc")) {
                                let objDsmcc = new table_1.TsTableDsmcc(section).decode();
                                if (objDsmcc !== null) {
                                    this.emit("dsmcc", objBasic.PID, objDsmcc);
                                }
                            }
                        }
                        else if (tableId === 0x40 || tableId === 0x41) {
                            if (this.listenerCount("nit")) {
                                let objNit = new table_1.TsTableNit(section).decode();
                                if (objNit !== null) {
                                    this.emit("nit", objBasic.PID, objNit);
                                }
                            }
                        }
                        else if (tableId === 0x42 || tableId === 0x46) {
                            if (this.listenerCount("sdt")) {
                                let objSdt = new table_1.TsTableSdt(section).decode();
                                if (objSdt !== null) {
                                    this.emit("sdt", objBasic.PID, objSdt);
                                }
                            }
                        }
                        else if (tableId === 0x4A) {
                            if (this.listenerCount("bat")) {
                                let objBat = new table_1.TsTableBat(section).decode();
                                if (objBat !== null) {
                                    this.emit("bat", objBasic.PID, objBat);
                                }
                            }
                        }
                        else if (tableId >= 0x4E && tableId <= 0x6F) {
                            if (this.listenerCount("eit")) {
                                let objEit = (0, eit_1.decode)(section);
                                if (objEit !== null) {
                                    this.emit("eit", objBasic.PID, objEit);
                                }
                            }
                        }
                        else if (tableId === 0x70) {
                            if (this.listenerCount("tdt")) {
                                let objTdt = new table_1.TsTableTdt(section).decode();
                                if (objTdt !== null) {
                                    this.emit("tdt", objBasic.PID, objTdt);
                                }
                            }
                        }
                        else if (tableId === 0x73) {
                            if (this.listenerCount("tot")) {
                                let objTot = new table_1.TsTableTot(section).decode();
                                if (objTot !== null) {
                                    this.emit("tot", objBasic.PID, objTot);
                                }
                            }
                        }
                        else if (tableId === 0x7E) {
                            if (this.listenerCount("dit")) {
                                let objDit = new table_1.TsTableDit(section).decode();
                                if (objDit !== null) {
                                    this.emit("dit", objBasic.PID, objDit);
                                }
                            }
                        }
                        else if (tableId === 0x7F) {
                            if (this.listenerCount("sit")) {
                                let objSit = new table_1.TsTableSit(section).decode();
                                if (objSit !== null) {
                                    this.emit("sit", objBasic.PID, objSit);
                                }
                            }
                        }
                        else if (tableId === 0xC3) {
                            if (this.listenerCount("sdtt")) {
                                let objSdtt = new table_1.TsTableSdtt(section).decode();
                                if (objSdtt !== null) {
                                    this.emit("sdtt", objBasic.PID, objSdtt);
                                }
                            }
                        }
                        else if (tableId === 0xC4) {
                            if (this.listenerCount("bit")) {
                                let objBit = (0, bit_1.decode)(section);
                                if (objBit !== null) {
                                    this.emit("bit", objBasic.PID, objBit);
                                }
                            }
                        }
                        else if (tableId === 0xC8) {
                            if (this.listenerCount("cdt")) {
                                let objCdt = new table_1.TsTableCdt(section).decode();
                                if (objCdt !== null) {
                                    this.emit("cdt", objBasic.PID, objCdt);
                                }
                            }
                        }
                    }
                }
            }
            if (this.options.transform) {
                if (objBasic.PID !== 0 && this.trans.pids.indexOf(objBasic.PID) !== -1) {
                    this.push(packet);
                }
            }
            else {
                this.push(packet);
            }
        }
        return result.buffer;
    }
    parsePat(pid, objPat) {
        if (this.trans.pat !== null && objPat.version_number === this.trans.pat.version_number)
            return;
        this.trans.pat = objPat;
        if (this.listenerCount("updatePat")) {
            this.emit("updatePat", pid, objPat);
        }
        this.updatePids();
        this.rebuildPat();
    }
    parseCat(pid, objCat) {
        if (this.trans.cat !== null && objCat.version_number === this.trans.cat.version_number)
            return;
        this.trans.cat = objCat;
        if (this.listenerCount("updateCat")) {
            this.emit("updateCat", pid, objCat);
        }
        this.updatePids();
    }
    parsePmt(pid, objPmt) {
        if (this.trans.pmt.hasOwnProperty(pid) && objPmt.version_number === this.trans.pmt[pid].version_number)
            return;
        this.trans.pmt[pid] = objPmt;
        if (this.listenerCount("updatePmt")) {
            this.emit("updatePmt", pid, objPmt);
        }
        this.updatePids();
    }
    updatePids() {
        let pmtPids = this.options.transPmtPids.slice();
        let pids = this.options.transPids.slice();
        pids.push(0x0000);
        if (this.trans.pat !== null) {
            let detectedPmtId = 0;
            for (let program of this.trans.pat.programs) {
                if (program.program_number === 0) {
                    if (pids.indexOf(program.network_PID) !== -1)
                        continue;
                    pids.push(program.network_PID);
                }
                else {
                    if (pmtPids.indexOf(program.program_map_PID) === -1) {
                        if (this.options.transPmtIds.indexOf(-1) !== -1 ||
                            this.options.transPmtIds.indexOf(detectedPmtId) !== -1 ||
                            this.options.transPmtSids.indexOf(program.program_number) !== -1) {
                            pmtPids.push(program.program_map_PID);
                        }
                    }
                    detectedPmtId++;
                }
            }
        }
        if (this.trans.cat !== null) {
            for (let descriptor of this.trans.cat.descriptors) {
                if (descriptor.descriptor_tag !== 0x09)
                    continue;
                if (pids.indexOf(descriptor.CA_PID) !== -1)
                    continue;
                pids.push(descriptor.CA_PID);
            }
        }
        for (let pmtPid of pmtPids) {
            if (!this.trans.pmt.hasOwnProperty(pmtPid))
                continue;
            if (pids.indexOf(pmtPid) === -1) {
                pids.push(pmtPid);
            }
            if (pids.indexOf(this.trans.pmt[pmtPid].PCR_PID) === -1) {
                pids.push(this.trans.pmt[pmtPid].PCR_PID);
            }
            for (let descriptor of this.trans.pmt[pmtPid].program_info) {
                if (descriptor.descriptor_tag !== 0x09)
                    continue;
                if (pids.indexOf(descriptor.CA_PID) !== -1)
                    continue;
                pids.push(descriptor.CA_PID);
            }
            for (let _stream of this.trans.pmt[pmtPid].streams) {
                if (pids.indexOf(_stream.elementary_PID) !== -1)
                    continue;
                pids.push(_stream.elementary_PID);
            }
        }
        this.trans.pmtPids = pmtPids;
        this.trans.pids = pids;
    }
    rebuildPat() {
        let objPacket = {
            payload_unit_start_indicator: 1,
            transport_priority: 1,
            PID: 0,
            transport_scrambling_control: 0,
            adaptation_field_control: 1,
            continuity_counter: 0,
            data_byte: null
        };
        let objPat = {
            table_id: 0,
            section_syntax_indicator: 1,
            transport_stream_id: this.trans.pat.transport_stream_id,
            version_number: this.trans.rebuild.patVersion,
            current_next_indicator: 1,
            section_number: 0,
            last_section_number: 0,
            programs: []
        };
        for (let program of this.trans.pat.programs) {
            if (program.program_number === 0) {
                objPat.programs.push({
                    program_number: program.program_number,
                    network_PID: program.network_PID
                });
            }
            else {
                if (this.trans.pmtPids.indexOf(program.program_map_PID) !== -1) {
                    objPat.programs.push({
                        program_number: program.program_number,
                        program_map_PID: program.program_map_PID
                    });
                }
            }
        }
        let bufferPat = new table_1.TsTablePat(buffer_1.Buffer.alloc(0x400, 0xFF)).encode(objPat);
        if (bufferPat.length > 183) {
            throw new RangeError("PAT is too long");
        }
        objPacket.data_byte = buffer_1.Buffer.concat([buffer_1.Buffer.alloc(1), bufferPat]);
        this.trans.rebuild.pat = new packet_1.default(buffer_1.Buffer.alloc(188, 0xFF)).encode(objPacket);
        this.trans.rebuild.patVersion = (this.trans.rebuild.patVersion + 1) & 0x1F;
    }
    createPat() {
        let bufferPacket = buffer_1.Buffer.from(this.trans.rebuild.pat);
        bufferPacket[3] = (bufferPacket[3] & 0xF0) | this.trans.rebuild.patCounter;
        this.trans.rebuild.patCounter = (this.trans.rebuild.patCounter + 1) & 0x0F;
        return bufferPacket;
    }
    _transform(chunk, encoding, callback) {
        this.buffer.add(chunk);
        if (this.options.bufferSize !== -1 && this.buffer.length > this.options.bufferSize) {
            let buffer = this.parse(this.buffer.concat());
            this.buffer.reset();
            if (buffer !== null)
                this.buffer.add(buffer);
        }
        callback();
    }
    _flush(callback) {
        let buffer = this.parse(this.buffer.concat());
        this.buffer.reset();
        this.push(buffer);
        if (this.listenerCount("info")) {
            let info = {};
            for (let key of Object.keys(this.info)) {
                info[key] = this.info[key].toObject();
            }
            this.emit("info", info);
        }
        callback();
    }
}
exports.default = TsStream;
//# sourceMappingURL=stream.js.map