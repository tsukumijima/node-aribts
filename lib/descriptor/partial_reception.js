"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorPartialReception {
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
        objDescriptor.services = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let service = {};
            service.service_id = reader.uimsbf(16);
            objDescriptor.services.push(service);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorPartialReception;
//# sourceMappingURL=partial_reception.js.map