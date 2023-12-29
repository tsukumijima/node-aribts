import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorConditionalAccess {
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

        // @ts-expect-error TS(2339): Property 'CA_system_ID' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.CA_system_ID = reader.uimsbf(16);
        reader.next(3);    // reserved
        // @ts-expect-error TS(2339): Property 'CA_PID' does not exist on type '{}'.
        objDescriptor.CA_PID = reader.uimsbf(13);
        // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.private_data_byte = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorConditionalAccess;
