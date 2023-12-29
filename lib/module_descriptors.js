"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsModuleDescriptor = require("./module_descriptor");
class TsModuleDescriptors {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let arrDescriptors = [];
        for (let bytesRead = 0; bytesRead < this.buffer.length;) {
            let objDescriptor;
            let descriptorTag = this.buffer[bytesRead++];
            let descriptorLength = this.buffer[bytesRead++];
            let buffer = this.buffer.slice(bytesRead - 2, bytesRead + descriptorLength);
            bytesRead += descriptorLength;
            switch (descriptorTag) {
                case 0x01:
                    objDescriptor = new tsModuleDescriptor.TsModuleDescriptorType(buffer).decode();
                    break;
                case 0x02:
                    objDescriptor = new tsModuleDescriptor.TsModuleDescriptorName(buffer).decode();
                    break;
                case 0x03:
                    objDescriptor = new tsModuleDescriptor.TsModuleDescriptorInfo(buffer).decode();
                    break;
                case 0x04:
                    objDescriptor = new tsModuleDescriptor.TsModuleDescriptorModuleLink(buffer).decode();
                    break;
                case 0x05:
                    objDescriptor = new tsModuleDescriptor.TsModuleDescriptorCrc32(buffer).decode();
                    break;
                default:
                    objDescriptor = new tsModuleDescriptor.TsModuleDescriptorUnknown(buffer).decode();
            }
            arrDescriptors.push(objDescriptor);
        }
        return arrDescriptors;
    }
}
exports.default = TsModuleDescriptors;
//# sourceMappingURL=module_descriptors.js.map