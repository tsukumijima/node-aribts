import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSmoothingBuffer {
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

        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'sb_leak_rate' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.sb_leak_rate = reader.uimsbf(22);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'sb_size' does not exist on type '{}'.
        objDescriptor.sb_size = reader.uimsbf(22);

        return objDescriptor;
    }
}

export default TsDescriptorSmoothingBuffer;
