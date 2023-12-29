"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorPartialTransportStreamTime {
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
        objDescriptor.event_version_number = reader.uimsbf(8);
        objDescriptor.event_start_time = reader.readBytes(5);
        objDescriptor.duration = reader.readBytes(3);
        objDescriptor.offset = reader.readBytes(3);
        reader.next(5);
        objDescriptor.offset_flag = reader.bslbf(1);
        objDescriptor.other_descriptor_status = reader.bslbf(1);
        objDescriptor.jst_time_flag = reader.bslbf(1);
        if (objDescriptor.jst_time_flag === 1) {
            objDescriptor.jst_time = reader.readBytes(5);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorPartialTransportStreamTime;
//# sourceMappingURL=partial_transport_stream_time.js.map