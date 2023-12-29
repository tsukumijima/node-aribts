"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorVideoStream {
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
        objDescriptor.multiple_frame_rate_flag = reader.bslbf(1);
        objDescriptor.frame_rate_code = reader.uimsbf(4);
        objDescriptor.MPEG_1_only_flag = reader.bslbf(1);
        objDescriptor.constrained_parameter_flag = reader.bslbf(1);
        objDescriptor.still_picture_flag = reader.bslbf(1);
        if (objDescriptor.MPEG_1_only_flag === 0) {
            objDescriptor.profile_and_level_indication = reader.uimsbf(8);
            objDescriptor.chroma_format = reader.uimsbf(2);
            objDescriptor.frame_rate_extension_flag = reader.bslbf(1);
            reader.next(5);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorVideoStream;
//# sourceMappingURL=video_stream.js.map