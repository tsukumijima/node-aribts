"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorNodeRelation {
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
        objDescriptor.reference_type = reader.uimsbf(4);
        objDescriptor.external_reference_flag = reader.bslbf(1);
        reader.next(3);
        if (objDescriptor.external_reference_flag === 1) {
            objDescriptor.information_provider_id = reader.uimsbf(16);
            objDescriptor.event_relation_id = reader.uimsbf(16);
        }
        objDescriptor.reference_node_id = reader.uimsbf(16);
        objDescriptor.reference_number = reader.uimsbf(8);
        return objDescriptor;
    }
}
exports.default = TsDescriptorNodeRelation;
//# sourceMappingURL=node_relation.js.map