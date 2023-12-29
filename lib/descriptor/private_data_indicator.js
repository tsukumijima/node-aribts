"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorPrivateDataIndicator {
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
        objDescriptor.private_data_indicator = reader.readBytes(4);
        return objDescriptor;
    }
}
exports.default = TsDescriptorPrivateDataIndicator;
//# sourceMappingURL=private_data_indicator.js.map