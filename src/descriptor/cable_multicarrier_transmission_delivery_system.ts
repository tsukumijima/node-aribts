import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCableMulticarrierTransmissionDeliverySystem {
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

        // @ts-expect-error TS(2339): Property 'frequency' does not exist on type '{}'.
        objDescriptor.frequency = reader.bslbf(32);
        reader.next(8);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'frame_type' does not exist on type '{}'.
        objDescriptor.frame_type = reader.bslbf(4);
        // @ts-expect-error TS(2339): Property 'FEC_outer' does not exist on type '{}'.
        objDescriptor.FEC_outer = reader.bslbf(4);
        // @ts-expect-error TS(2339): Property 'modulation' does not exist on type '{}'.
        objDescriptor.modulation = reader.bslbf(8);
        // @ts-expect-error TS(2339): Property 'symbol_rate' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.symbol_rate = reader.bslbf(28);
        // @ts-expect-error TS(2339): Property 'FEC_inner' does not exist on type '{}'.
        objDescriptor.FEC_inner = reader.bslbf(4);
        // @ts-expect-error TS(2339): Property 'carrier_group_id' does not exist on type... Remove this comment to see the full error message
        objDescriptor.carrier_group_id = reader.bslbf(8);

        return objDescriptor;
    }
}

export default TsDescriptorCableMulticarrierTransmissionDeliverySystem;
