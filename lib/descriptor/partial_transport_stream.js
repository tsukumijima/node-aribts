"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorPartialTransportStream {
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
        objDescriptor.peak_rate = reader.uimsbf(22);
        reader.next(2);
        objDescriptor.minimum_overall_smoothing_rate = reader.uimsbf(22);
        reader.next(2);
        objDescriptor.maximum_overall_smoothing_buffer = reader.uimsbf(14);
        return objDescriptor;
    }
}
exports.default = TsDescriptorPartialTransportStream;
//# sourceMappingURL=partial_transport_stream.js.map