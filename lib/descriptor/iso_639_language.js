"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorIso639Language {
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
        objDescriptor.ISO_639_languages = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let ISO_639_language = {};
            ISO_639_language.ISO_639_language_code = reader.readBytes(3);
            ISO_639_language.audio_type = reader.bslbf(8);
            objDescriptor.ISO_639_languages.push(ISO_639_language);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorIso639Language;
//# sourceMappingURL=iso_639_language.js.map