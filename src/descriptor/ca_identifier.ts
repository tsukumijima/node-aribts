import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCaIdentifier {
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
        // @ts-expect-error TS(2339): Property 'CAs' does not exist on type '{}'.
        objDescriptor.CAs = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let CA_identifier = {};

            // @ts-expect-error TS(2339): Property 'CA_system_id' does not exist on type '{}... Remove this comment to see the full error message
            CA_identifier.CA_system_id = reader.uimsbf(16);

            // @ts-expect-error TS(2339): Property 'CAs' does not exist on type '{}'.
            objDescriptor.CAs.push(CA_identifier);
        }

        return objDescriptor;
    }
}

export default TsDescriptorCaIdentifier;
