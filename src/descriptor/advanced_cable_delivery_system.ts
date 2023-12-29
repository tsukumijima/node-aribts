import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorAdvancedCableDeliverySystem {
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

        // @ts-expect-error TS(2339): Property 'extention_descriptor_tag' does not exist... Remove this comment to see the full error message
        objDescriptor.extention_descriptor_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'PLP_ID' does not exist on type '{}'.
        objDescriptor.PLP_ID = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'effective_symbol_length' does not exist ... Remove this comment to see the full error message
        objDescriptor.effective_symbol_length = reader.uimsbf(3);
        // @ts-expect-error TS(2339): Property 'guard_interval' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.guard_interval = reader.uimsbf(3);
        // @ts-expect-error TS(2339): Property 'bundled_channel' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.bundled_channel = reader.uimsbf(8);
        reader.next(2);    // reserved_future_use

        // @ts-expect-error TS(2339): Property 'frequencies' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.frequencies = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let frequency = {};

            // @ts-expect-error TS(2339): Property 'data_slice_id' does not exist on type '{... Remove this comment to see the full error message
            frequency.data_slice_id = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'tune_freq' does not exist on type '{}'.
            frequency.tune_freq = reader.uimsbf(32);
            // @ts-expect-error TS(2339): Property 'tune_freq_type' does not exist on type '... Remove this comment to see the full error message
            frequency.tune_freq_type = reader.uimsbf(2);
            // @ts-expect-error TS(2339): Property 'FEC_outer' does not exist on type '{}'.
            frequency.FEC_outer = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'modulation' does not exist on type '{}'.
            frequency.modulation = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'FEC_inner' does not exist on type '{}'.
            frequency.FEC_inner = reader.uimsbf(4);
            reader.next(6);    // reserved_future_use

            // @ts-expect-error TS(2339): Property 'frequencies' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.frequencies.push(frequency);
        }

        return objDescriptor;
    }
}

export default TsDescriptorAdvancedCableDeliverySystem;
