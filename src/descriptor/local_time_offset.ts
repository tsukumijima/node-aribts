import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorLocalTimeOffset {
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

        // @ts-expect-error TS(2339): Property 'local_time_offsets' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.local_time_offsets = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let local_time_offset = {};

            // @ts-expect-error TS(2339): Property 'country_code' does not exist on type '{}... Remove this comment to see the full error message
            local_time_offset.country_code = reader.readBytes(3);
            // @ts-expect-error TS(2339): Property 'country_region_id' does not exist on typ... Remove this comment to see the full error message
            local_time_offset.country_region_id = reader.bslbf(6);
            reader.next(1);    // reserved
            // @ts-expect-error TS(2339): Property 'local_time_offset_polarity' does not exi... Remove this comment to see the full error message
            local_time_offset.local_time_offset_polarity = reader.bslbf(1);
            // @ts-expect-error TS(2339): Property 'local_time_offset' does not exist on typ... Remove this comment to see the full error message
            local_time_offset.local_time_offset = reader.readBytes(2);
            // @ts-expect-error TS(2339): Property 'time_of_change' does not exist on type '... Remove this comment to see the full error message
            local_time_offset.time_of_change = reader.readBytes(5);
            // @ts-expect-error TS(2339): Property 'next_time_offset' does not exist on type... Remove this comment to see the full error message
            local_time_offset.next_time_offset = reader.readBytes(2);

            // @ts-expect-error TS(2339): Property 'local_time_offsets' does not exist on ty... Remove this comment to see the full error message
            objDescriptor.local_time_offsets.push(local_time_offset);
        }

        return objDescriptor;
    }
}

export default TsDescriptorLocalTimeOffset;
