import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorIbp {
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

        // @ts-expect-error TS(2339): Property 'closed_gop_flag' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.closed_gop_flag = reader.uimsbf(1);
        // @ts-expect-error TS(2339): Property 'identical_gop_flag' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.identical_gop_flag = reader.uimsbf(1);
        // @ts-expect-error TS(2339): Property 'max_gop_length' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.max_gop_length = reader.uimsbf(14);

        return objDescriptor;
    }
}

export default TsDescriptorIbp;
