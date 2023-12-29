import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorConnectedTransmission {
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

        // @ts-expect-error TS(2339): Property 'connected_transmission_group_id' does no... Remove this comment to see the full error message
        objDescriptor.connected_transmission_group_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'segment_type' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.segment_type = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'modulation_type_A' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.modulation_type_A = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'modulation_type_B' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.modulation_type_B = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'modulation_type_C' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.modulation_type_C = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'additional_connected_transmission_info' ... Remove this comment to see the full error message
        objDescriptor.additional_connected_transmission_info = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorConnectedTransmission;
