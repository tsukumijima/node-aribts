import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSystemClock {
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

        // @ts-expect-error TS(2339): Property 'external_clock_reference_indicator' does... Remove this comment to see the full error message
        objDescriptor.external_clock_reference_indicator = reader.bslbf(1);
        reader.next(1);    // reserved
        // @ts-expect-error TS(2339): Property 'clock_accuracy_integer' does not exist o... Remove this comment to see the full error message
        objDescriptor.clock_accuracy_integer = reader.uimsbf(6);
        // @ts-expect-error TS(2339): Property 'clock_accuracy_exponent' does not exist ... Remove this comment to see the full error message
        objDescriptor.clock_accuracy_exponent = reader.uimsbf(3);
        reader.next(5);    // reserved

        return objDescriptor;
    }
}

export default TsDescriptorSystemClock;
