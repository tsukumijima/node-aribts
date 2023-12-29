"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorContentAvailability {
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
        reader.next(1);
        objDescriptor.copy_restriction_mode = reader.bslbf(1);
        objDescriptor.image_constraint_token = reader.bslbf(1);
        objDescriptor.retention_mode = reader.bslbf(1);
        objDescriptor.retention_state = reader.bslbf(3);
        objDescriptor.encryption_mode = reader.bslbf(1);
        return objDescriptor;
    }
}
exports.default = TsDescriptorContentAvailability;
//# sourceMappingURL=content_availability.js.map