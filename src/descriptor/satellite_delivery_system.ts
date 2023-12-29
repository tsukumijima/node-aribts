import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSatelliteDeliverySystem {
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
        // @ts-expect-error TS(2339): Property 'orbital_position' does not exist on type... Remove this comment to see the full error message
        objDescriptor.orbital_position = reader.bslbf(16);
        // @ts-expect-error TS(2339): Property 'west_east_flag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.west_east_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'polarisation' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.polarisation = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'modulation' does not exist on type '{}'.
        objDescriptor.modulation = reader.bslbf(5);
        // @ts-expect-error TS(2339): Property 'symbol_rate' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.symbol_rate = reader.bslbf(28);
        // @ts-expect-error TS(2339): Property 'FEC_inner' does not exist on type '{}'.
        objDescriptor.FEC_inner = reader.bslbf(4);

        return objDescriptor;
    }
}

export default TsDescriptorSatelliteDeliverySystem;
