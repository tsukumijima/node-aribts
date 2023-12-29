import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorHierarchicalTransmission {
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

        reader.next(7);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'quality_level' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.quality_level = reader.bslbf(1);
        reader.next(3);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'reference_PID' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.reference_PID = reader.uimsbf(13);

        return objDescriptor;
    }
}

export default TsDescriptorHierarchicalTransmission;
