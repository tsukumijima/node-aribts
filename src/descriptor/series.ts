import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSeries {
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

        // @ts-expect-error TS(2339): Property 'series_id' does not exist on type '{}'.
        objDescriptor.series_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'repeat_label' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.repeat_label = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'program_pattern' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.program_pattern = reader.uimsbf(3);
        // @ts-expect-error TS(2339): Property 'expire_date_valid_flag' does not exist o... Remove this comment to see the full error message
        objDescriptor.expire_date_valid_flag = reader.uimsbf(1);
        // @ts-expect-error TS(2339): Property 'expire_date' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.expire_date = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'episode_number' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.episode_number = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'last_episode_number' does not exist on t... Remove this comment to see the full error message
        objDescriptor.last_episode_number = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'series_name_char' does not exist on type... Remove this comment to see the full error message
        objDescriptor.series_name_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorSeries;
