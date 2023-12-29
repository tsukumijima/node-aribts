"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorMultiplexBufferUtilization {
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
        objDescriptor.bound_valid_flag = reader.bslbf(1);
        objDescriptor.LTW_offset_lower_bound = reader.uimsbf(15);
        reader.next(1);
        objDescriptor.LTW_offset_upper_bound = reader.uimsbf(14);
        return objDescriptor;
    }
}
exports.default = TsDescriptorMultiplexBufferUtilization;
//# sourceMappingURL=multiplex_buffer_utilization.js.map