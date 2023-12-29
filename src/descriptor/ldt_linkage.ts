import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorLdtLinkage {
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

        // @ts-expect-error TS(2339): Property 'original_service_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.original_service_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.transport_stream_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.original_network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'descriptions' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.descriptions = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let description = {};

            // @ts-expect-error TS(2339): Property 'description_id' does not exist on type '... Remove this comment to see the full error message
            description.description_id = reader.uimsbf(16);
            reader.uimsbf(4);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'description_type' does not exist on type... Remove this comment to see the full error message
            description.description_type = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'user_defined' does not exist on type '{}... Remove this comment to see the full error message
            description.user_defined = reader.bslbf(8);

            // @ts-expect-error TS(2339): Property 'descriptions' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.descriptions.push(description);
        }

        return objDescriptor;
    }
}

export default TsDescriptorLdtLinkage;
