import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorLinkage {
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

        // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.transport_stream_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.original_network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
        objDescriptor.service_id = reader.bslbf(16);
        // @ts-expect-error TS(2339): Property 'linkage_type' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.linkage_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.private_data_byte = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorLinkage;
