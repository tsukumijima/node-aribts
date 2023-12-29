import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorStcReference {
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

        reader.next(3);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'external_event_flag' does not exist on t... Remove this comment to see the full error message
        objDescriptor.external_event_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'STC_reference_mode' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.STC_reference_mode = reader.uimsbf(4);

        // @ts-expect-error TS(2339): Property 'external_event_flag' does not exist on t... Remove this comment to see the full error message
        if (objDescriptor.external_event_flag === 1) {
            // @ts-expect-error TS(2339): Property 'external_event_id' does not exist on typ... Remove this comment to see the full error message
            objDescriptor.external_event_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'external_service_id' does not exist on t... Remove this comment to see the full error message
            objDescriptor.external_service_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'external_network_id' does not exist on t... Remove this comment to see the full error message
            objDescriptor.external_network_id = reader.uimsbf(16);
        }

        // @ts-expect-error TS(2339): Property 'STC_reference_mode' does not exist on ty... Remove this comment to see the full error message
        if (objDescriptor.STC_reference_mode === 0) {
            // nothing
        // @ts-expect-error TS(2339): Property 'STC_reference_mode' does not exist on ty... Remove this comment to see the full error message
        } else if (objDescriptor.STC_reference_mode === 1) {
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'NPT_reference' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.NPT_reference = reader.uimsbf(33);
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'STC_reference' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.STC_reference = reader.uimsbf(33);
        // @ts-expect-error TS(2339): Property 'STC_reference_mode' does not exist on ty... Remove this comment to see the full error message
        } else if (objDescriptor.STC_reference_mode === 3 || objDescriptor.STC_reference_mode === 5 ) {
            // @ts-expect-error TS(2339): Property 'time_reference' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.time_reference = reader.uimsbf(24);
            // @ts-expect-error TS(2339): Property 'time_reference_extention' does not exist... Remove this comment to see the full error message
            objDescriptor.time_reference_extention = reader.uimsbf(12);
            reader.next(11);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'STC_reference' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.STC_reference = reader.uimsbf(33);
        } else {
            // reserved
        }

        return objDescriptor;
    }
}

export default TsDescriptorStcReference;
