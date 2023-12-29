import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorTimeShiftedEvent {
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

        // @ts-expect-error TS(2339): Property 'reference_service_id' does not exist on ... Remove this comment to see the full error message
        objDescriptor.reference_service_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'reference_event_id' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.reference_event_id = reader.uimsbf(16);

        return objDescriptor;
    }
}

export default TsDescriptorTimeShiftedEvent;
