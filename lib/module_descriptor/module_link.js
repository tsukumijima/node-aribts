"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsModuleDescriptorModuleLink {
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
        objDescriptor.position = reader.uimsbf(8);
        objDescriptor.moduleId = reader.uimsbf(16);
        return objDescriptor;
    }
}
exports.default = TsModuleDescriptorModuleLink;
//# sourceMappingURL=module_link.js.map