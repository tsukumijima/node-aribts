import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorHyperlink {
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

        // @ts-expect-error TS(2339): Property 'hyper_linkage_type' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.hyper_linkage_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'link_destination_type' does not exist on... Remove this comment to see the full error message
        objDescriptor.link_destination_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'selector_length' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.selector_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'selector' does not exist on type '{}'.
        objDescriptor.selector = reader.readBytes(objDescriptor.selector_length);
        // @ts-expect-error TS(2339): Property 'private_data' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.private_data = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorHyperlink;
