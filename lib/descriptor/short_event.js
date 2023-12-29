"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorShortEvent {
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
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        objDescriptor.event_name_length = reader.uimsbf(8);
        objDescriptor.event_name_char = reader.readBytes(objDescriptor.event_name_length);
        objDescriptor.text_length = reader.uimsbf(8);
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);
        return objDescriptor;
    }
}
exports.default = TsDescriptorShortEvent;
//# sourceMappingURL=short_event.js.map