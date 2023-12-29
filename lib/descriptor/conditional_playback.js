"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorConditionalPlayback {
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
        objDescriptor.conditional_playback_id = reader.uimsbf(16);
        reader.next(3);
        objDescriptor.conditional_playback_PID = reader.uimsbf(13);
        return objDescriptor;
    }
}
exports.default = TsDescriptorConditionalPlayback;
//# sourceMappingURL=conditional_playback.js.map