"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsCrc32 = require("../crc32");
const reader_1 = require("../reader");
const descriptors_1 = require("../descriptors");
class TsTableCat {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        if (TsCrc32.calc(this.buffer) !== 0)
            return null;
        let reader = new reader_1.default(this.buffer);
        let objCat = {};
        objCat._raw = this.buffer;
        objCat.table_id = reader.uimsbf(8);
        objCat.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objCat.section_length = reader.uimsbf(12);
        reader.next(18);
        objCat.version_number = reader.uimsbf(5);
        objCat.current_next_indicator = reader.bslbf(1);
        objCat.section_number = reader.uimsbf(8);
        objCat.last_section_number = reader.uimsbf(8);
        objCat.descriptors = new descriptors_1.default(reader.readBytesRaw(3 + objCat.section_length - (reader.position >> 3) - 4)).decode();
        objCat.CRC_32 = reader.readBytes(4);
        return objCat;
    }
}
exports.default = TsTableCat;
//# sourceMappingURL=cat.js.map