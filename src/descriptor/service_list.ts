import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorServiceList {
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
            // @ts-expect-error TS(2339): Property 'service_type' does not exist on type '{}... Remove this comment to see the full error message
            service.service_type = reader.uimsbf(8);

            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            objDescriptor.services.push(service);
        }

        return objDescriptor;
    }
}

export default TsDescriptorServiceList;
