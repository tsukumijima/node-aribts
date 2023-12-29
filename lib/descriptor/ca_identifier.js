"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorCaIdentifier {
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
        objDescriptor.CAs = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let CA_identifier = {};
            CA_identifier.CA_system_id = reader.uimsbf(16);
            objDescriptor.CAs.push(CA_identifier);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorCaIdentifier;
//# sourceMappingURL=ca_identifier.js.map