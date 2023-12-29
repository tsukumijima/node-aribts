import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorPartialTransportStreamTime {
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

        // @ts-expect-error TS(2339): Property 'event_version_number' does not exist on ... Remove this comment to see the full error message
        objDescriptor.event_version_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'event_start_time' does not exist on type... Remove this comment to see the full error message
        objDescriptor.event_start_time = reader.readBytes(5);
        // @ts-expect-error TS(2339): Property 'duration' does not exist on type '{}'.
        objDescriptor.duration = reader.readBytes(3);
        // @ts-expect-error TS(2339): Property 'offset' does not exist on type '{}'.
        objDescriptor.offset = reader.readBytes(3);
        reader.next(5);    // reserved
        // @ts-expect-error TS(2339): Property 'offset_flag' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.offset_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'other_descriptor_status' does not exist ... Remove this comment to see the full error message
        objDescriptor.other_descriptor_status = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'jst_time_flag' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.jst_time_flag = reader.bslbf(1);

        // @ts-expect-error TS(2339): Property 'jst_time_flag' does not exist on type '{... Remove this comment to see the full error message
        if (objDescriptor.jst_time_flag === 1) {
            // @ts-expect-error TS(2339): Property 'jst_time' does not exist on type '{}'.
            objDescriptor.jst_time = reader.readBytes(5);
        }

        return objDescriptor;
    }
}

export default TsDescriptorPartialTransportStreamTime;
