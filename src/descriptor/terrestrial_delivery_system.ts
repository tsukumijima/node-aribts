import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorTerrestrialDeliverySystem {
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

        // @ts-expect-error TS(2339): Property 'area_code' does not exist on type '{}'.
        objDescriptor.area_code = reader.bslbf(12);
        // @ts-expect-error TS(2339): Property 'guard_interval' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.guard_interval = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'transmission_mode' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.transmission_mode = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'frequencies' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.frequencies = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let frequency = {};

            // @ts-expect-error TS(2339): Property 'frequency' does not exist on type '{}'.
            frequency.frequency = reader.uimsbf(16);

            // @ts-expect-error TS(2339): Property 'frequencies' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.frequencies.push(frequency);
        }

        return objDescriptor;
    }
}

export default TsDescriptorTerrestrialDeliverySystem;
