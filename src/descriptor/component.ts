import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorComponent {
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

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'stream_content' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.stream_content = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'component_type' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.component_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.component_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
        objDescriptor.text_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorComponent;
