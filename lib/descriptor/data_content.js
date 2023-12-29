"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorDataContent {
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
        objDescriptor.data_component_id = reader.uimsbf(16);
        objDescriptor.entry_component = reader.uimsbf(8);
        objDescriptor.selector_length = reader.uimsbf(8);
        objDescriptor.selector_byte = reader.readBytes(objDescriptor.selector_length);
        objDescriptor.num_of_component_ref = reader.uimsbf(8);
        objDescriptor.component_ref = reader.readBytes(objDescriptor.num_of_component_ref);
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        objDescriptor.text_length = reader.uimsbf(8);
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);
        return objDescriptor;
    }
}
exports.default = TsDescriptorDataContent;
//# sourceMappingURL=data_content.js.map