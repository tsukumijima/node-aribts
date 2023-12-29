import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorTsInformation {
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

        // @ts-expect-error TS(2339): Property 'remote_control_key_id' does not exist on... Remove this comment to see the full error message
        objDescriptor.remote_control_key_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'length_of_ts_name' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.length_of_ts_name = reader.uimsbf(6);
        // @ts-expect-error TS(2339): Property 'transmission_type_count' does not exist ... Remove this comment to see the full error message
        objDescriptor.transmission_type_count = reader.uimsbf(2);
        // @ts-expect-error TS(2339): Property 'ts_name_char' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.ts_name_char = reader.readBytes(objDescriptor.length_of_ts_name);
        // @ts-expect-error TS(2339): Property 'transmission_types' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.transmission_types = [];

        // @ts-expect-error TS(2339): Property 'transmission_type_count' does not exist ... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.transmission_type_count; i++) {
            let transmission_type = {};

            // @ts-expect-error TS(2339): Property 'transmission_type_info' does not exist o... Remove this comment to see the full error message
            transmission_type.transmission_type_info = reader.bslbf(8);
            // @ts-expect-error TS(2339): Property 'num_of_service' does not exist on type '... Remove this comment to see the full error message
            transmission_type.num_of_service = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            transmission_type.services = [];

            // @ts-expect-error TS(2339): Property 'num_of_service' does not exist on type '... Remove this comment to see the full error message
            for (let j = 0; j < transmission_type.num_of_service; j++) {
                let service = {};

                // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
                service.service_id = reader.uimsbf(16);

                // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
                transmission_type.services.push(service);
            }

            // @ts-expect-error TS(2339): Property 'transmission_types' does not exist on ty... Remove this comment to see the full error message
            objDescriptor.transmission_types.push(transmission_type);
        }

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            reader.next(8);    // reserved_future_use
        }

        return objDescriptor;
    }
}

export default TsDescriptorTsInformation;
