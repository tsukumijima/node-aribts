import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorShortEvent {
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

        // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        // @ts-expect-error TS(2339): Property 'event_name_length' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.event_name_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'event_name_char' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.event_name_char = reader.readBytes(objDescriptor.event_name_length);
        // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.text_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);

        return objDescriptor;
    }
}

export default TsDescriptorShortEvent;
