import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorBasicLocalEvent {
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

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'segmentation_mode' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.segmentation_mode = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'segmentation_info_length' does not exist... Remove this comment to see the full error message
        objDescriptor.segmentation_info_length = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'segmentation_mode' does not exist on typ... Remove this comment to see the full error message
        if (objDescriptor.segmentation_mode === 0) {
            // nothing
        // @ts-expect-error TS(2339): Property 'segmentation_mode' does not exist on typ... Remove this comment to see the full error message
        } else if (objDescriptor.segmentation_mode === 1) {
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'start_time_NPT' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.start_time_NPT = reader.uimsbf(33);
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'end_time_NPT' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.end_time_NPT = reader.uimsbf(33);
        // @ts-expect-error TS(2339): Property 'segmentation_mode' does not exist on typ... Remove this comment to see the full error message
        } else if (objDescriptor.segmentation_mode < 6) {
            // @ts-expect-error TS(2339): Property 'start_time' does not exist on type '{}'.
            objDescriptor.start_time = reader.uimsbf(24);
            // @ts-expect-error TS(2339): Property 'duration' does not exist on type '{}'.
            objDescriptor.duration = reader.uimsbf(24);

            // @ts-expect-error TS(2339): Property 'segmentation_info_length' does not exist... Remove this comment to see the full error message
            if (objDescriptor.segmentation_info_length === 10) {
                // @ts-expect-error TS(2339): Property 'start_time_extension' does not exist on ... Remove this comment to see the full error message
                objDescriptor.start_time_extension = reader.uimsbf(12);
                reader.next(4);    // reserved_future_use
                // @ts-expect-error TS(2339): Property 'duration_extension' does not exist on ty... Remove this comment to see the full error message
                objDescriptor.duration_extension = reader.uimsbf(12);
                reader.next(4);    // reserved_future_use
            }
        } else {
            // @ts-expect-error TS(2339): Property 'segmentation_info_length' does not exist... Remove this comment to see the full error message
            reader.next(objDescriptor.segmentation_info_length << 3);    // reserved
        }

        // @ts-expect-error TS(2339): Property 'component_tags' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.component_tags = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let component_tag = {};

            // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
            component_tag.component_tag = reader.uimsbf(8);

            // @ts-expect-error TS(2339): Property 'component_tags' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.component_tags.push(component_tag);
        }

        return objDescriptor;
    }
}

export default TsDescriptorBasicLocalEvent;
