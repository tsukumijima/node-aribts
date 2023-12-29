"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsCrc32 = require("../crc32");
const reader_1 = require("../reader");
const descriptors_1 = require("../descriptors");
class TsTableTot {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        if (TsCrc32.calc(this.buffer) !== 0)
            return null;
        let reader = new reader_1.default(this.buffer);
        let objTot = {};
        objTot._raw = this.buffer;
        objTot.table_id = reader.uimsbf(8);
        objTot.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objTot.section_length = reader.uimsbf(12);
        objTot.JST_time = reader.readBytes(5);
        reader.next(4);
        objTot.descriptors_loop_length = reader.uimsbf(12);
        objTot.descriptors = new descriptors_1.default(reader.readBytesRaw(objTot.descriptors_loop_length)).decode();
        objTot.CRC_32 = reader.readBytes(4);
        return objTot;
    }
}
exports.default = TsTableTot;
//# sourceMappingURL=tot.js.map