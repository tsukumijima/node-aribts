import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorService {
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

        // @ts-expect-error TS(2339): Property 'service_type' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.service_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'service_provider_name_length' does not e... Remove this comment to see the full error message
        objDescriptor.service_provider_name_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'service_provider_name_char' does not exi... Remove this comment to see the full error message
        objDescriptor.service_provider_name_char = reader.readBytes(objDescriptor.service_provider_name_length);
        // @ts-expect-error TS(2339): Property 'service_name_length' does not exist on t... Remove this comment to see the full error message
        objDescriptor.service_name_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'service_name_char' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.service_name_char = reader.readBytes(objDescriptor.service_name_length);

        return objDescriptor;
    }
}

export default TsDescriptorService;
