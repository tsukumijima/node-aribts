import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorPartialTransportStream {
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

        reader.next(2);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'peak_rate' does not exist on type '{}'.
        objDescriptor.peak_rate = reader.uimsbf(22);
        reader.next(2);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'minimum_overall_smoothing_rate' does not... Remove this comment to see the full error message
        objDescriptor.minimum_overall_smoothing_rate = reader.uimsbf(22);
        reader.next(2);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'maximum_overall_smoothing_buffer' does n... Remove this comment to see the full error message
        objDescriptor.maximum_overall_smoothing_buffer = reader.uimsbf(14);

        return objDescriptor;
    }
}

export default TsDescriptorPartialTransportStream;
