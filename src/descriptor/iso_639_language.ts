import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorIso639Language {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor: { [key: string]: any } = {};

        objDescriptor._raw = this.buffer;

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        objDescriptor.ISO_639_languages = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let ISO_639_language: { [key: string]: any } = {};

            ISO_639_language.ISO_639_language_code = reader.readBytes(3);
            ISO_639_language.audio_type = reader.bslbf(8);

            objDescriptor.ISO_639_languages.push(ISO_639_language);
        }

        return objDescriptor;
    }
}

export default TsDescriptorIso639Language;
