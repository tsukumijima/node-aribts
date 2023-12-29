"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsTableTdt {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objTdt = {};
        objTdt._raw = this.buffer;
        objTdt.table_id = reader.uimsbf(8);
        objTdt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objTdt.section_length = reader.uimsbf(12);
        objTdt.JST_time = reader.readBytes(5);
        return objTdt;
    }
}
exports.default = TsTableTdt;
//# sourceMappingURL=tdt.js.map