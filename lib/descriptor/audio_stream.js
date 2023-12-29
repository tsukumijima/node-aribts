"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorAudioStream {
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
        objDescriptor.free_format_flag = reader.bslbf(1);
        objDescriptor.ID = reader.bslbf(1);
        objDescriptor.layer = reader.bslbf(2);
        objDescriptor.variable_rate_audio_indicator = reader.bslbf(1);
        reader.next(3);
        return objDescriptor;
    }
}
exports.default = TsDescriptorAudioStream;
//# sourceMappingURL=audio_stream.js.map