import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorContent {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDescriptor._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'descriptor_tag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_length = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'contents' does not exist on type '{}'.
        objDescriptor.contents = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let content = {};

            // @ts-expect-error TS(2339): Property 'content_nibble_level_1' does not exist o... Remove this comment to see the full error message
            content.content_nibble_level_1 = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'content_nibble_level_2' does not exist o... Remove this comment to see the full error message
            content.content_nibble_level_2 = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'user_nibble_1' does not exist on type '{... Remove this comment to see the full error message
            content.user_nibble_1 = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'user_nibble_2' does not exist on type '{... Remove this comment to see the full error message
            content.user_nibble_2 = reader.uimsbf(4);

            // @ts-expect-error TS(2339): Property 'contents' does not exist on type '{}'.
            objDescriptor.contents.push(content);
        }

        return objDescriptor;
    }
}

export default TsDescriptorContent;
