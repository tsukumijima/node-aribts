"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const info_1 = require("./info");
const packet_1 = require("./packet");
const table_1 = require("./table");
const eit_1 = require("./table/eit");
const bit_1 = require("./table/bit");
class TsStreamLite extends events_1.EventEmitter {
    info = {};
    constructor() {
        super();
    }
    write(packets) {
        for (const packet of packets) {
            const tsPacket = new packet_1.default(packet);
            const objBasic = tsPacket.decodeBasic();
            if (objBasic.transport_error_indicator === 1)
                continue;
            if (this.info[objBasic.PID] === undefined) {
                this.info[objBasic.PID] = new info_1.TsInfo();
            }
            const info = this.info[objBasic.PID];
            info.packet++;
            if ((objBasic.adaptation_field_control & 0x01) === 1) {
                const sections = [];
                if (objBasic["adaptation_field"] &&
                    objBasic.adaptation_field.discontinuity_indicator === 1) {
                    info.counter = -1;
                }
                if (info.counter !== -1 && objBasic.PID !== 0x1FFF) {
                    const counter = objBasic.continuity_counter;
                    const previous = info.counter;
                    const expected = (previous + 1) & 0x0F;
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
                            const data = packet_1.default.getData(packet);
                            let bytesRead = 0;
                            const pointerField = data[0];
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
                                const sectionLength = 3 + ((data[bytesRead + 1] & 0x0F) << 8 | data[bytesRead + 2]);
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
                                const data = packet_1.default.getData(packet);
                                const restLength = info.buffer.entireLength - info.buffer.length;
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
                    for (const section of sections) {
                        const tableId = section[0];
                        if (tableId === 0x00) {
                            if (this.listenerCount("pat")) {
                                const objPat = new table_1.TsTablePat(section).decode();
                                if (objPat !== null) {
                                    this.emit("pat", objBasic.PID, objPat);
                                }
                            }
                        }
                        else if (tableId === 0x01) {
                            if (this.listenerCount("cat")) {
                                const objCat = new table_1.TsTableCat(section).decode();
                                if (objCat !== null) {
                                    this.emit("cat", objBasic.PID, objCat);
                                }
                            }
                        }
                        else if (tableId === 0x02) {
                            if (this.listenerCount("pmt")) {
                                const objPmt = new table_1.TsTablePmt(section).decode();
                                if (objPmt !== null) {
                                    this.emit("pmt", objBasic.PID, objPmt);
                                }
                            }
                        }
                        else if (tableId >= 0x3A && tableId <= 0x3F) {
                            if (this.listenerCount("dsmcc")) {
                                const objDsmcc = new table_1.TsTableDsmcc(section).decode();
                                if (objDsmcc !== null) {
                                    this.emit("dsmcc", objBasic.PID, objDsmcc);
                                }
                            }
                        }
                        else if (tableId === 0x40 || tableId === 0x41) {
                            if (this.listenerCount("nit")) {
                                const objNit = new table_1.TsTableNit(section).decode();
                                if (objNit !== null) {
                                    this.emit("nit", objBasic.PID, objNit);
                                }
                            }
                        }
                        else if (tableId === 0x42 || tableId === 0x46) {
                            if (this.listenerCount("sdt")) {
                                const objSdt = new table_1.TsTableSdt(section).decode();
                                if (objSdt !== null) {
                                    this.emit("sdt", objBasic.PID, objSdt);
                                }
                            }
                        }
                        else if (tableId === 0x4A) {
                            if (this.listenerCount("bat")) {
                                const objBat = new table_1.TsTableBat(section).decode();
                                if (objBat !== null) {
                                    this.emit("bat", objBasic.PID, objBat);
                                }
                            }
                        }
                        else if (tableId >= 0x4E && tableId <= 0x6F) {
                            if (this.listenerCount("eit")) {
                                const objEit = (0, eit_1.decode)(section);
                                if (objEit !== null) {
                                    this.emit("eit", objBasic.PID, objEit);
                                }
                            }
                        }
                        else if (tableId === 0x70) {
                            if (this.listenerCount("tdt")) {
                                const objTdt = new table_1.TsTableTdt(section).decode();
                                if (objTdt !== null) {
                                    this.emit("tdt", objBasic.PID, objTdt);
                                }
                            }
                        }
                        else if (tableId === 0x73) {
                            if (this.listenerCount("tot")) {
                                const objTot = new table_1.TsTableTot(section).decode();
                                if (objTot !== null) {
                                    this.emit("tot", objBasic.PID, objTot);
                                }
                            }
                        }
                        else if (tableId === 0x7E) {
                            if (this.listenerCount("dit")) {
                                const objDit = new table_1.TsTableDit(section).decode();
                                if (objDit !== null) {
                                    this.emit("dit", objBasic.PID, objDit);
                                }
                            }
                        }
                        else if (tableId === 0x7F) {
                            if (this.listenerCount("sit")) {
                                const objSit = new table_1.TsTableSit(section).decode();
                                if (objSit !== null) {
                                    this.emit("sit", objBasic.PID, objSit);
                                }
                            }
                        }
                        else if (tableId === 0xC3) {
                            if (this.listenerCount("sdtt")) {
                                const objSdtt = new table_1.TsTableSdtt(section).decode();
                                if (objSdtt !== null) {
                                    this.emit("sdtt", objBasic.PID, objSdtt);
                                }
                            }
                        }
                        else if (tableId === 0xC4) {
                            if (this.listenerCount("bit")) {
                                const objBit = (0, bit_1.decode)(section);
                                if (objBit !== null) {
                                    this.emit("bit", objBasic.PID, objBit);
                                }
                            }
                        }
                        else if (tableId === 0xC8) {
                            if (this.listenerCount("cdt")) {
                                const objCdt = new table_1.TsTableCdt(section).decode();
                                if (objCdt !== null) {
                                    this.emit("cdt", objBasic.PID, objCdt);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    end() {
        delete this.info;
    }
}
exports.default = TsStreamLite;
//# sourceMappingURL=stream_lite.js.map