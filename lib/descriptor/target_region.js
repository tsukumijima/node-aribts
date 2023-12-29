"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorTargetRegion {
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
        objDescriptor.region_spec_type = reader.uimsbf(8);
        objDescriptor.target_region_spec = {};
        if (objDescriptor.region_spec_type === 0x01) {
            objDescriptor.target_region_spec.prefecture_bitmap = reader.readBytes(7);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorTargetRegion;
//# sourceMappingURL=target_region.js.map