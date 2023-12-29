import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorEmergencyInformation {
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

        // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
        objDescriptor.services = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let service = {};

            // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
            service.service_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'start_end_flag' does not exist on type '... Remove this comment to see the full error message
            service.start_end_flag = reader.bslbf(1);
            // @ts-expect-error TS(2339): Property 'signal_level' does not exist on type '{}... Remove this comment to see the full error message
            service.signal_level = reader.bslbf(1);
            reader.next(6);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'area_code_length' does not exist on type... Remove this comment to see the full error message
            service.area_code_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'area_codes' does not exist on type '{}'.
            service.area_codes = [];

            // @ts-expect-error TS(2339): Property 'area_code_length' does not exist on type... Remove this comment to see the full error message
            for (let length = (reader.position >> 3) + objDescriptor.area_code_length; reader.position >> 3 < length; ) {
                let area_code = {};

                // @ts-expect-error TS(2339): Property 'area_code' does not exist on type '{}'.
                area_code.area_code = reader.bslbf(12);
                reader.next(4);    // reserved_future_use

                // @ts-expect-error TS(2339): Property 'area_codes' does not exist on type '{}'.
                service.area_codes.push(area_code);
            }

            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            objDescriptor.services.push(service);
        }

        return objDescriptor;
    }
}

export default TsDescriptorEmergencyInformation;
