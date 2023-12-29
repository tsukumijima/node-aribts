"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorService {
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
        objDescriptor.service_type = reader.uimsbf(8);
        objDescriptor.service_provider_name_length = reader.uimsbf(8);
        objDescriptor.service_provider_name_char = reader.readBytes(objDescriptor.service_provider_name_length);
        objDescriptor.service_name_length = reader.uimsbf(8);
        objDescriptor.service_name_char = reader.readBytes(objDescriptor.service_name_length);
        return objDescriptor;
    }
}
exports.default = TsDescriptorService;
//# sourceMappingURL=service.js.map