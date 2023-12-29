"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorDataComponent {
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
        objDescriptor.additional_data_component_info = reader.readBytes(objDescriptor.descriptor_length - 2);
        return objDescriptor;
    }
}
exports.default = TsDescriptorDataComponent;
//# sourceMappingURL=data_component.js.map