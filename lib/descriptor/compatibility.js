"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorCompatibility {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objDescriptor = {};
        objDescriptor._raw = this.buffer;
        objDescriptor.compatibilityDescriptorLength = reader.uimsbf(16);
        objDescriptor.descriptorCount = reader.uimsbf(16);
        objDescriptor.descriptors = [];
        for (let i = 0; i < objDescriptor.descriptorCount; i++) {
            let descriptor = {};
            descriptor.descriptorType = reader.uimsbf(8);
            descriptor.descriptorLength = reader.uimsbf(8);
            descriptor.specifierType = reader.uimsbf(8);
            descriptor.specifierData = reader.readBytes(3);
            descriptor.model = reader.uimsbf(16);
            descriptor.version = reader.uimsbf(16);
            descriptor.subDescriptorCount = reader.uimsbf(8);
            descriptor.subDescriptors = [];
            for (let j = 0; j < objDescriptor.subDescriptorCount; j++) {
                let subDescriptor = {};
                subDescriptor.subDescriptorType = reader.uimsbf(8);
                subDescriptor.subDescriptorLength = reader.uimsbf(8);
                subDescriptor.additionalInformation = reader.readBytes(subDescriptor.subDescriptorLength);
                descriptor.subDescriptors.push(subDescriptor);
            }
            objDescriptor.descriptors.push(descriptor);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorCompatibility;
//# sourceMappingURL=compatibility.js.map