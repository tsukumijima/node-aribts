"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorVideoDecodeControl {
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
        objDescriptor.still_picture_flag = reader.bslbf(1);
        objDescriptor.sequence_end_code_flag = reader.bslbf(1);
        objDescriptor.video_encode_format = reader.bslbf(4);
        reader.next(2);
        return objDescriptor;
    }
}
exports.default = TsDescriptorVideoDecodeControl;
//# sourceMappingURL=video_decode_control.js.map