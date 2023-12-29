"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorTerrestrialDeliverySystem {
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
        objDescriptor.area_code = reader.bslbf(12);
        objDescriptor.guard_interval = reader.bslbf(2);
        objDescriptor.transmission_mode = reader.bslbf(2);
        objDescriptor.frequencies = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let frequency = {};
            frequency.frequency = reader.uimsbf(16);
            objDescriptor.frequencies.push(frequency);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorTerrestrialDeliverySystem;
//# sourceMappingURL=terrestrial_delivery_system.js.map