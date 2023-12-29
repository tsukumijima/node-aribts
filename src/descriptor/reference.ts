import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorReference {
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

        // @ts-expect-error TS(2339): Property 'information_provider_id' does not exist ... Remove this comment to see the full error message
        objDescriptor.information_provider_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'event_relation_id' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.event_relation_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'references' does not exist on type '{}'.
        objDescriptor.references = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let reference = {};

            // @ts-expect-error TS(2339): Property 'reference_node_id' does not exist on typ... Remove this comment to see the full error message
            reference.reference_node_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'reference_number' does not exist on type... Remove this comment to see the full error message
            reference.reference_number = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'last_reference_number' does not exist on... Remove this comment to see the full error message
            reference.last_reference_number = reader.uimsbf(8);

            // @ts-expect-error TS(2339): Property 'references' does not exist on type '{}'.
            objDescriptor.references.push(reference);
        }

        return objDescriptor;
    }
}

export default TsDescriptorReference;
