"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorHierarchy {
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
        objDescriptor.temporal_scalability_flag = reader.bslbf(1);
        objDescriptor.spatial_scalability_flag = reader.bslbf(1);
        objDescriptor.quality_scalability_flag = reader.bslbf(1);
        objDescriptor.hierarchy_type = reader.uimsbf(4);
        reader.next(2);
        objDescriptor.hierarchy_layer_index = reader.uimsbf(6);
        objDescriptor.tref_present_flag = reader.bslbf(1);
        reader.next(1);
        objDescriptor.hierarchy_embedded_layer_index = reader.uimsbf(6);
        reader.next(2);
        objDescriptor.hierarchy_channel = reader.uimsbf(6);
        return objDescriptor;
    }
}
exports.default = TsDescriptorHierarchy;
//# sourceMappingURL=hierarchy.js.map