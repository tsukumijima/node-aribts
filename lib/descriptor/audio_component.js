"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorAudioComponent {
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
        reader.next(4);
        objDescriptor.stream_content = reader.uimsbf(4);
        objDescriptor.component_type = reader.uimsbf(8);
        objDescriptor.component_tag = reader.uimsbf(8);
        objDescriptor.stream_type = reader.uimsbf(8);
        objDescriptor.simulcast_group_tag = reader.bslbf(8);
        objDescriptor.ES_multi_lingual_flag = reader.bslbf(1);
        objDescriptor.main_component_flag = reader.bslbf(1);
        objDescriptor.quality_indicator = reader.bslbf(2);
        objDescriptor.sampling_rate = reader.uimsbf(3);
        reader.next(1);
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        if (objDescriptor.ES_multi_lingual_flag === 1) {
            objDescriptor.ISO_639_language_code_2 = reader.readBytes(3);
        }
        objDescriptor.text_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        return objDescriptor;
    }
}
exports.default = TsDescriptorAudioComponent;
//# sourceMappingURL=audio_component.js.map