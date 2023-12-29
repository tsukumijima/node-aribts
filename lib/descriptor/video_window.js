"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorVideoWindow {
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
        objDescriptor.horizontal_offset = reader.uimsbf(14);
        objDescriptor.vertical_offset = reader.uimsbf(14);
        objDescriptor.window_priority = reader.uimsbf(4);
        return objDescriptor;
    }
}
exports.default = TsDescriptorVideoWindow;
//# sourceMappingURL=video_window.js.map