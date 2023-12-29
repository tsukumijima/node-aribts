"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorIbp {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objDescriptor = {};
        objDescriptor._raw = this.buffer;
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);
        objDescriptor.closed_gop_flag = reader.uimsbf(1);
        objDescriptor.identical_gop_flag = reader.uimsbf(1);
        objDescriptor.max_gop_length = reader.uimsbf(14);
        return objDescriptor;
    }
}
exports.default = TsDescriptorIbp;
//# sourceMappingURL=ibp.js.map