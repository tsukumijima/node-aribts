import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorLogoTransmission {
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

        // @ts-expect-error TS(2339): Property 'logo_transmission_type' does not exist o... Remove this comment to see the full error message
        objDescriptor.logo_transmission_type = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'logo_transmission_type' does not exist o... Remove this comment to see the full error message
        if (objDescriptor.logo_transmission_type === 1) {
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'logo_id' does not exist on type '{}'.
            objDescriptor.logo_id = reader.uimsbf(9);
            reader.next(4);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'logo_version' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.logo_version = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'download_data_id' does not exist on type... Remove this comment to see the full error message
            objDescriptor.download_data_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'logo_transmission_type' does not exist o... Remove this comment to see the full error message
        } else if (objDescriptor.logo_transmission_type === 2) {
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'logo_id' does not exist on type '{}'.
            objDescriptor.logo_id = reader.uimsbf(9);
        // @ts-expect-error TS(2339): Property 'logo_transmission_type' does not exist o... Remove this comment to see the full error message
        } else if (objDescriptor.logo_transmission_type === 3) {
            // @ts-expect-error TS(2339): Property 'logo_char' does not exist on type '{}'.
            objDescriptor.logo_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));
        }

        return objDescriptor;
    }
}

export default TsDescriptorLogoTransmission;
