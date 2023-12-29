import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorVideoStream {
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

        // @ts-expect-error TS(2339): Property 'multiple_frame_rate_flag' does not exist... Remove this comment to see the full error message
        objDescriptor.multiple_frame_rate_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'frame_rate_code' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.frame_rate_code = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'MPEG_1_only_flag' does not exist on type... Remove this comment to see the full error message
        objDescriptor.MPEG_1_only_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'constrained_parameter_flag' does not exi... Remove this comment to see the full error message
        objDescriptor.constrained_parameter_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'still_picture_flag' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.still_picture_flag = reader.bslbf(1);

        // @ts-expect-error TS(2339): Property 'MPEG_1_only_flag' does not exist on type... Remove this comment to see the full error message
        if (objDescriptor.MPEG_1_only_flag === 0) {
            // @ts-expect-error TS(2339): Property 'profile_and_level_indication' does not e... Remove this comment to see the full error message
            objDescriptor.profile_and_level_indication = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'chroma_format' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.chroma_format = reader.uimsbf(2);
            // @ts-expect-error TS(2339): Property 'frame_rate_extension_flag' does not exis... Remove this comment to see the full error message
            objDescriptor.frame_rate_extension_flag = reader.bslbf(1);
            reader.next(5);    // reserved
        }

        return objDescriptor;
    }
}

export default TsDescriptorVideoStream;
