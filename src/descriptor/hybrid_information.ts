import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorHybridInformation {
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

        // @ts-expect-error TS(2339): Property 'has_location' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.has_location = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'location_type' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.location_type = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'format' does not exist on type '{}'.
        objDescriptor.format = reader.uimsbf(4);
        reader.next(2);    // reserved

        // @ts-expect-error TS(2339): Property 'has_location' does not exist on type '{}... Remove this comment to see the full error message
        if (objDescriptor.has_location) {
            // @ts-expect-error TS(2339): Property 'location_type' does not exist on type '{... Remove this comment to see the full error message
            if (objDescriptor.location_type === 0) {
                // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
                objDescriptor.component_tag = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'module_id' does not exist on type '{}'.
                objDescriptor.module_id = reader.uimsbf(16);
            } else {
                // @ts-expect-error TS(2339): Property 'URL_length' does not exist on type '{}'.
                objDescriptor.URL_length = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'URL_byte' does not exist on type '{}'.
                objDescriptor.URL_byte = reader.readBytes(objDescriptor.URL_length);
            }
        }

        return objDescriptor;
    }
}

export default TsDescriptorHybridInformation;
