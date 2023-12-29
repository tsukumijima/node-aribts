"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorLogoTransmission {
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
        objDescriptor.logo_transmission_type = reader.uimsbf(8);
        if (objDescriptor.logo_transmission_type === 1) {
            reader.next(7);
            objDescriptor.logo_id = reader.uimsbf(9);
            reader.next(4);
            objDescriptor.logo_version = reader.uimsbf(12);
            objDescriptor.download_data_id = reader.uimsbf(16);
        }
        else if (objDescriptor.logo_transmission_type === 2) {
            reader.next(7);
            objDescriptor.logo_id = reader.uimsbf(9);
        }
        else if (objDescriptor.logo_transmission_type === 3) {
            objDescriptor.logo_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorLogoTransmission;
//# sourceMappingURL=logo_transmission.js.map