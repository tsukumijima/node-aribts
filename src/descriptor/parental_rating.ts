import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorParentalRating {
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

        // @ts-expect-error TS(2339): Property 'parental_ratings' does not exist on type... Remove this comment to see the full error message
        objDescriptor.parental_ratings = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let parental_rating = {};

            // @ts-expect-error TS(2339): Property 'country_code' does not exist on type '{}... Remove this comment to see the full error message
            parental_rating.country_code = reader.readBytes(3);
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            parental_rating.rating = reader.uimsbf(8);

            // @ts-expect-error TS(2339): Property 'parental_ratings' does not exist on type... Remove this comment to see the full error message
            objDescriptor.parental_ratings.push(parental_rating);
        }

        return objDescriptor;
    }
}

export default TsDescriptorParentalRating;
