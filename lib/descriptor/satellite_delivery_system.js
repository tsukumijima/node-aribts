"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorSatelliteDeliverySystem {
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
        objDescriptor.frequency = reader.bslbf(32);
        objDescriptor.orbital_position = reader.bslbf(16);
        objDescriptor.west_east_flag = reader.bslbf(1);
        objDescriptor.polarisation = reader.bslbf(2);
        objDescriptor.modulation = reader.bslbf(5);
        objDescriptor.symbol_rate = reader.bslbf(28);
        objDescriptor.FEC_inner = reader.bslbf(4);
        return objDescriptor;
    }
}
exports.default = TsDescriptorSatelliteDeliverySystem;
//# sourceMappingURL=satellite_delivery_system.js.map