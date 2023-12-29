"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorTargetBackgroundGrid {
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
        objDescriptor.horizontal_size = reader.uimsbf(14);
        objDescriptor.vertical_size = reader.uimsbf(14);
        objDescriptor.aspect_ratio_information = reader.uimsbf(4);
        return objDescriptor;
    }
}
exports.default = TsDescriptorTargetBackgroundGrid;
//# sourceMappingURL=target_background_grid.js.map