import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorContent {
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

        objDescriptor.contents = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let content: { [key: string]: any } = {};

            content.content_nibble_level_1 = reader.uimsbf(4);
            content.content_nibble_level_2 = reader.uimsbf(4);
            content.user_nibble_1 = reader.uimsbf(4);
            content.user_nibble_2 = reader.uimsbf(4);

            objDescriptor.contents.push(content);
        }

        return objDescriptor;
    }
}

export default TsDescriptorContent;
