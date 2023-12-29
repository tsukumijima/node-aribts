"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorBouquetName {
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
        objDescriptor.bouquet_name_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        return objDescriptor;
    }
}
exports.default = TsDescriptorBouquetName;
//# sourceMappingURL=bouquet_name.js.map