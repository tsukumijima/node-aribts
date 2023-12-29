import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorAudioComponent {
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

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'stream_content' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.stream_content = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'component_type' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.component_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.component_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'stream_type' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.stream_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'simulcast_group_tag' does not exist on t... Remove this comment to see the full error message
        objDescriptor.simulcast_group_tag = reader.bslbf(8);
        // @ts-expect-error TS(2339): Property 'ES_multi_lingual_flag' does not exist on... Remove this comment to see the full error message
        objDescriptor.ES_multi_lingual_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'main_component_flag' does not exist on t... Remove this comment to see the full error message
        objDescriptor.main_component_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'quality_indicator' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.quality_indicator = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'sampling_rate' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.sampling_rate = reader.uimsbf(3);
        reader.next(1);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
        objDescriptor.ISO_639_language_code = reader.readBytes(3);

        // @ts-expect-error TS(2339): Property 'ES_multi_lingual_flag' does not exist on... Remove this comment to see the full error message
        if (objDescriptor.ES_multi_lingual_flag === 1) {
            // @ts-expect-error TS(2339): Property 'ISO_639_language_code_2' does not exist ... Remove this comment to see the full error message
            objDescriptor.ISO_639_language_code_2 = reader.readBytes(3);
        }

        // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
        objDescriptor.text_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorAudioComponent;
