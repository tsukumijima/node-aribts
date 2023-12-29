import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorNearVideoOnDemandReference {
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

        // @ts-expect-error TS(2339): Property 'NVOD_references' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.NVOD_references = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let NVOD_reference = {};

            // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
            NVOD_reference.transport_stream_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
            NVOD_reference.original_network_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
            NVOD_reference.service_id = reader.uimsbf(16);

            // @ts-expect-error TS(2339): Property 'NVOD_references' does not exist on type ... Remove this comment to see the full error message
            objDescriptor.NVOD_references.push(NVOD_reference);
        }

        return objDescriptor;
    }
}

export default TsDescriptorNearVideoOnDemandReference;
