"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsCrc32 = require("../crc32");
const reader_1 = require("../reader");
const writer_1 = require("../writer");
class TsTablePat {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        if (TsCrc32.calc(this.buffer) !== 0)
            return null;
        let reader = new reader_1.default(this.buffer);
        let objPat = {};
        objPat._raw = this.buffer;
        objPat.table_id = reader.uimsbf(8);
        objPat.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objPat.section_length = reader.uimsbf(12);
        objPat.transport_stream_id = reader.uimsbf(16);
        reader.next(2);
        objPat.version_number = reader.uimsbf(5);
        objPat.current_next_indicator = reader.bslbf(1);
        objPat.section_number = reader.uimsbf(8);
        objPat.last_section_number = reader.uimsbf(8);
        objPat.programs = [];
        while (reader.position >> 3 < 3 + objPat.section_length - 4) {
            let program = {};
            program.program_number = reader.uimsbf(16);
            reader.next(3);
            if (program.program_number === 0) {
                program.network_PID = reader.uimsbf(13);
            }
            else {
                program.program_map_PID = reader.uimsbf(13);
            }
            objPat.programs.push(program);
        }
        objPat.CRC_32 = reader.readBytes(4);
        return objPat;
    }
    encode(objPat) {
        let writer = new writer_1.default(this.buffer);
        let pos;
        writer.uimsbf(8, objPat.table_id);
        writer.bslbf(1, objPat.section_syntax_indicator);
        writer.bslbf(1, 0);
        writer.bslbf(2, 0b11);
        writer.next(12);
        writer.uimsbf(16, objPat.transport_stream_id);
        writer.bslbf(2, 0b11);
        writer.uimsbf(5, objPat.version_number);
        writer.bslbf(1, objPat.current_next_indicator);
        writer.uimsbf(8, objPat.section_number);
        writer.uimsbf(8, objPat.last_section_number);
        objPat.programs.forEach(program => {
            writer.uimsbf(16, program.program_number);
            writer.bslbf(3, 0);
            if (program.program_number === 0) {
                writer.uimsbf(13, program.network_PID);
            }
            else {
                writer.uimsbf(13, program.program_map_PID);
            }
        });
        pos = writer.position >> 3;
        writer.position = 12;
        writer.uimsbf(12, pos - 3 + 4);
        writer.position = pos << 3;
        pos = writer.position >> 3;
        writer.writeBytes(4, TsCrc32.calcToBuffer(this.buffer.slice(0, pos)));
        return this.buffer.slice(0, pos + 4);
    }
}
exports.default = TsTablePat;
//# sourceMappingURL=pat.js.map