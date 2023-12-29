"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorSeries {
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
        objDescriptor.series_id = reader.uimsbf(16);
        objDescriptor.repeat_label = reader.uimsbf(4);
        objDescriptor.program_pattern = reader.uimsbf(3);
        objDescriptor.expire_date_valid_flag = reader.uimsbf(1);
        objDescriptor.expire_date = reader.uimsbf(16);
        objDescriptor.episode_number = reader.uimsbf(12);
        objDescriptor.last_episode_number = reader.uimsbf(12);
        objDescriptor.series_name_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        return objDescriptor;
    }
}
exports.default = TsDescriptorSeries;
//# sourceMappingURL=series.js.map