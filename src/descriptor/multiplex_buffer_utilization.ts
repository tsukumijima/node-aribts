import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorMultiplexBufferUtilization {
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

        // @ts-expect-error TS(2339): Property 'bound_valid_flag' does not exist on type... Remove this comment to see the full error message
        objDescriptor.bound_valid_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'LTW_offset_lower_bound' does not exist o... Remove this comment to see the full error message
        objDescriptor.LTW_offset_lower_bound = reader.uimsbf(15);
        reader.next(1);    // reserved
        // @ts-expect-error TS(2339): Property 'LTW_offset_upper_bound' does not exist o... Remove this comment to see the full error message
        objDescriptor.LTW_offset_upper_bound = reader.uimsbf(14);

        return objDescriptor;
    }
}

export default TsDescriptorMultiplexBufferUtilization;
