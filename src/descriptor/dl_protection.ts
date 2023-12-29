import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorDlProtection {
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

        // @ts-expect-error TS(2339): Property 'DL_system_ID' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.DL_system_ID = reader.uimsbf(8);
        reader.next(3);    // '111'
        // @ts-expect-error TS(2339): Property 'PID' does not exist on type '{}'.
        objDescriptor.PID = reader.uimsbf(13);
        // @ts-expect-error TS(2339): Property 'encrypt_protocol_number' does not exist ... Remove this comment to see the full error message
        objDescriptor.encrypt_protocol_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'encrypt_info' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.encrypt_info = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorDlProtection;
