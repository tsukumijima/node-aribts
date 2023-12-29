import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorVideoDecodeControl {
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

        // @ts-expect-error TS(2339): Property 'still_picture_flag' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.still_picture_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'sequence_end_code_flag' does not exist o... Remove this comment to see the full error message
        objDescriptor.sequence_end_code_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'video_encode_format' does not exist on t... Remove this comment to see the full error message
        objDescriptor.video_encode_format = reader.bslbf(4);
        reader.next(2);    // reserved_future_use

        return objDescriptor;
    }
}

export default TsDescriptorVideoDecodeControl;
