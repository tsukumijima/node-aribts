import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorExtendedEvent {
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

        // @ts-expect-error TS(2339): Property 'descriptor_number' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_number = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'last_descriptor_number' does not exist o... Remove this comment to see the full error message
        objDescriptor.last_descriptor_number = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
        objDescriptor.ISO_639_language_code = reader.readBytes(3);
        // @ts-expect-error TS(2339): Property 'length_of_items' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.length_of_items = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'items' does not exist on type '{}'.
        objDescriptor.items = [];

        // @ts-expect-error TS(2339): Property 'length_of_items' does not exist on type ... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.length_of_items; ) {
            let item = {};

            // @ts-expect-error TS(2339): Property 'item_description_length' does not exist ... Remove this comment to see the full error message
            item.item_description_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'item_description_char' does not exist on... Remove this comment to see the full error message
            item.item_description_char = reader.readBytes(item.item_description_length);
            // @ts-expect-error TS(2339): Property 'item_length' does not exist on type '{}'... Remove this comment to see the full error message
            item.item_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'item_char' does not exist on type '{}'.
            item.item_char = reader.readBytes(item.item_length);

            // @ts-expect-error TS(2339): Property 'items' does not exist on type '{}'.
            objDescriptor.items.push(item);

            // @ts-expect-error TS(2339): Property 'item_description_length' does not exist ... Remove this comment to see the full error message
            i += 2 + item.item_description_length + item.item_length;
        }

        // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.text_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);

        return objDescriptor;
    }
}

export default TsDescriptorExtendedEvent;
