"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorSmoothingBuffer {
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
        reader.next(2);
        objDescriptor.sb_leak_rate = reader.uimsbf(22);
        reader.next(2);
        objDescriptor.sb_size = reader.uimsbf(22);
        return objDescriptor;
    }
}
exports.default = TsDescriptorSmoothingBuffer;
//# sourceMappingURL=smoothing_buffer.js.map