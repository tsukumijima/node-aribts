import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorNetworkIdentification {
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

        // @ts-expect-error TS(2339): Property 'country_code' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.country_code = reader.readBytes(3);
        // @ts-expect-error TS(2339): Property 'media_type' does not exist on type '{}'.
        objDescriptor.media_type = reader.bslbf(16);
        // @ts-expect-error TS(2339): Property 'network_id' does not exist on type '{}'.
        objDescriptor.network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'private_data' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.private_data = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorNetworkIdentification;
