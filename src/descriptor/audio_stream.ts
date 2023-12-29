import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorAudioStream {
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

        // @ts-expect-error TS(2339): Property 'free_format_flag' does not exist on type... Remove this comment to see the full error message
        objDescriptor.free_format_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'ID' does not exist on type '{}'.
        objDescriptor.ID = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'layer' does not exist on type '{}'.
        objDescriptor.layer = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'variable_rate_audio_indicator' does not ... Remove this comment to see the full error message
        objDescriptor.variable_rate_audio_indicator = reader.bslbf(1);
        reader.next(3);    // reserved

        return objDescriptor;
    }
}

export default TsDescriptorAudioStream;
