"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorHierarchicalTransmission {
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
        reader.next(7);
        objDescriptor.quality_level = reader.bslbf(1);
        reader.next(3);
        objDescriptor.reference_PID = reader.uimsbf(13);
        return objDescriptor;
    }
}
exports.default = TsDescriptorHierarchicalTransmission;
//# sourceMappingURL=hierarchical_transmission.js.map