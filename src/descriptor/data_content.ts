import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorDataContent {
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

        // @ts-expect-error TS(2339): Property 'data_component_id' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.data_component_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'entry_component' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.entry_component = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'selector_length' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.selector_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'selector_byte' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.selector_byte = reader.readBytes(objDescriptor.selector_length);
        // @ts-expect-error TS(2339): Property 'num_of_component_ref' does not exist on ... Remove this comment to see the full error message
        objDescriptor.num_of_component_ref = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'component_ref' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.component_ref = reader.readBytes(objDescriptor.num_of_component_ref);
        // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.text_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);

        return objDescriptor;
    }
}

export default TsDescriptorDataContent;
