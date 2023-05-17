"use strict";
const TsReader = require("../reader");
class TsDescriptorPartialTransportStream {
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new TsReader(this.buffer);
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
module.exports = TsDescriptorPartialTransportStream;
//# sourceMappingURL=partial_transport_stream.js.map