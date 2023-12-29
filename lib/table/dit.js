"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsTableDit {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objDit = {};
        objDit._raw = this.buffer;
        objDit.table_id = reader.uimsbf(8);
        objDit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objDit.section_length = reader.uimsbf(12);
        objDit.transition_flag = reader.uimsbf(1);
        return objDit;
    }
}
exports.default = TsTableDit;
//# sourceMappingURL=dit.js.map