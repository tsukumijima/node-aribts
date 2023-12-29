"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorCableMulticarrierTransmissionDeliverySystem {
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
        reader.next(8);
        objDescriptor.frame_type = reader.bslbf(4);
        objDescriptor.FEC_outer = reader.bslbf(4);
        objDescriptor.modulation = reader.bslbf(8);
        objDescriptor.symbol_rate = reader.bslbf(28);
        objDescriptor.FEC_inner = reader.bslbf(4);
        objDescriptor.carrier_group_id = reader.bslbf(8);
        return objDescriptor;
    }
}
exports.default = TsDescriptorCableMulticarrierTransmissionDeliverySystem;
//# sourceMappingURL=cable_multicarrier_transmission_delivery_system.js.map