import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorLocalTimeOffset {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor: { [key: string]: any } = {};

        objDescriptor._raw = this.buffer;

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        objDescriptor.local_time_offsets = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let local_time_offset: { [key: string]: any } = {};

            local_time_offset.country_code = reader.readBytes(3);
            local_time_offset.country_region_id = reader.bslbf(6);
            reader.next(1);    // reserved
            local_time_offset.local_time_offset_polarity = reader.bslbf(1);
            local_time_offset.local_time_offset = reader.readBytes(2);
            local_time_offset.time_of_change = reader.readBytes(5);
            local_time_offset.next_time_offset = reader.readBytes(2);

            objDescriptor.local_time_offsets.push(local_time_offset);
        }

        return objDescriptor;
    }
}

export default TsDescriptorLocalTimeOffset;
