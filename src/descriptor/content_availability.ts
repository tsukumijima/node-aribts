import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorContentAvailability {
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

        reader.next(1);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'copy_restriction_mode' does not exist on... Remove this comment to see the full error message
        objDescriptor.copy_restriction_mode = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'image_constraint_token' does not exist o... Remove this comment to see the full error message
        objDescriptor.image_constraint_token = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'retention_mode' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.retention_mode = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'retention_state' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.retention_state = reader.bslbf(3);
        // @ts-expect-error TS(2339): Property 'encryption_mode' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.encryption_mode = reader.bslbf(1);

        return objDescriptor;
    }
}

export default TsDescriptorContentAvailability;
