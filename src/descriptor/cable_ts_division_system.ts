import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCableTsDivisionSystem {
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

        // @ts-expect-error TS(2339): Property 'frequencies' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.frequencies = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let frequency = {};

            // @ts-expect-error TS(2339): Property 'frequency' does not exist on type '{}'.
            frequency.frequency = reader.uimsbf(32);
            reader.next(7);    // '1111111'
            // @ts-expect-error TS(2339): Property 'future_use_flag' does not exist on type ... Remove this comment to see the full error message
            frequency.future_use_flag = reader.bslbf(1);
            // @ts-expect-error TS(2339): Property 'multiplex_frame_format_number' does not ... Remove this comment to see the full error message
            frequency.multiplex_frame_format_number = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'FEC_outer' does not exist on type '{}'.
            frequency.FEC_outer = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'modulation' does not exist on type '{}'.
            frequency.modulation = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'symbol_rate' does not exist on type '{}'... Remove this comment to see the full error message
            frequency.symbol_rate = reader.uimsbf(28);
            reader.next(4);    // '1111'

            // @ts-expect-error TS(2339): Property 'future_use_flag' does not exist on type ... Remove this comment to see the full error message
            if (frequency.future_use_flag === 0) {
                // @ts-expect-error TS(2339): Property 'future_use_data_length' does not exist o... Remove this comment to see the full error message
                frequency.future_use_data_length = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'future_use_data' does not exist on type ... Remove this comment to see the full error message
                frequency.future_use_data = reader.readBytes(frequency.future_use_data_length);
            }

            // @ts-expect-error TS(2339): Property 'num_of_services' does not exist on type ... Remove this comment to see the full error message
            frequency.num_of_services = reader.uimsbf(28);
            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            frequency.services = [];

            // @ts-expect-error TS(2339): Property 'num_of_services' does not exist on type ... Remove this comment to see the full error message
            for (let i = 0; i < frequency.num_of_services; i++) {
                let service = {};

                // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
                service.service_id = reader.uimsbf(16);

                // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
                frequency.services.push(service);
            }

            // @ts-expect-error TS(2339): Property 'frequencies' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.frequencies.push(frequency);
        }

        return objDescriptor;
    }
}

export default TsDescriptorCableTsDivisionSystem;
