"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorBroadcasterName {
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
        objDescriptor.char = reader.readBytes(objDescriptor.descriptor_length);
        return objDescriptor;
    }
}
exports.default = TsDescriptorBroadcasterName;
//# sourceMappingURL=broadcaster_name.js.map