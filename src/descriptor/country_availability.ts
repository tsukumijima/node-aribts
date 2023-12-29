import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCountryAvailability {
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

        // @ts-expect-error TS(2339): Property 'country_availability_flag' does not exis... Remove this comment to see the full error message
        objDescriptor.country_availability_flag = reader.bslbf(1);
        reader.next(7);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'country_availabilities' does not exist o... Remove this comment to see the full error message
        objDescriptor.country_availabilities = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let country = {};

            // @ts-expect-error TS(2339): Property 'country_code' does not exist on type '{}... Remove this comment to see the full error message
            country.country_code = reader.readBytes(3);

            // @ts-expect-error TS(2339): Property 'country_availabilities' does not exist o... Remove this comment to see the full error message
            objDescriptor.country_availabilities.push(country);
        }

        return objDescriptor;
    }
}

export default TsDescriptorCountryAvailability;
