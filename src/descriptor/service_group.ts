import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorServiceGroup {
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

        // @ts-expect-error TS(2339): Property 'service_group_type' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.service_group_type = reader.uimsbf(4);
        reader.next(4);    // reserved_future_use

        // @ts-expect-error TS(2339): Property 'service_group_type' does not exist on ty... Remove this comment to see the full error message
        if (objDescriptor.service_group_type === 1) {
            // @ts-expect-error TS(2339): Property 'service_groups' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.service_groups = [];

            // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
            while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
                let service_group = {};

                // @ts-expect-error TS(2339): Property 'primary_service_id' does not exist on ty... Remove this comment to see the full error message
                service_group.primary_service_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'secondary_service_id' does not exist on ... Remove this comment to see the full error message
                service_group.secondary_service_id = reader.uimsbf(16);

                // @ts-expect-error TS(2339): Property 'service_groups' does not exist on type '... Remove this comment to see the full error message
                objDescriptor.service_groups.push(service_group);
            }
        } else {
            // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
            objDescriptor.private_data_byte = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        }

        return objDescriptor;
    }
}

export default TsDescriptorServiceGroup;
