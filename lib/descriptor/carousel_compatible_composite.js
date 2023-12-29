"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
const module_descriptors_1 = require("../module_descriptors");
class TsDescriptorCarouselCompatibleComposite {
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
        objDescriptor.sub_descriptors = new module_descriptors_1.default(reader.readBytesRaw(2 + objDescriptor.descriptor_length - (reader.position >> 3))).decode();
        return objDescriptor;
    }
}
exports.default = TsDescriptorCarouselCompatibleComposite;
//# sourceMappingURL=carousel_compatible_composite.js.map