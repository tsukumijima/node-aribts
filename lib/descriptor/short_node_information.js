"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorShortNodeInformation {
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
        objDescriptor.ISO_639_language_code = reader.bslbf(24);
        objDescriptor.node_name_length = reader.uimsbf(8);
        objDescriptor.node_name_char = reader.readBytes(objDescriptor.node_name_length);
        objDescriptor.text_length = reader.uimsbf(8);
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);
        return objDescriptor;
    }
}
exports.default = TsDescriptorShortNodeInformation;
//# sourceMappingURL=short_node_information.js.map