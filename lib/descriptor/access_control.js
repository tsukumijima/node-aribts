"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorAccessControl {
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
        objDescriptor.CA_system_id = reader.uimsbf(16);
        objDescriptor.transmission_type = reader.bslbf(3);
        objDescriptor.PID = reader.uimsbf(13);
        objDescriptor.private_data_byte = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        return objDescriptor;
    }
}
exports.default = TsDescriptorAccessControl;
//# sourceMappingURL=access_control.js.map