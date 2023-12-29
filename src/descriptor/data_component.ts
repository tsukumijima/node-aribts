import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorDataComponent {
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

        // @ts-expect-error TS(2339): Property 'data_component_id' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.data_component_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'additional_data_component_info' does not... Remove this comment to see the full error message
        objDescriptor.additional_data_component_info = reader.readBytes(objDescriptor.descriptor_length - 2);

        return objDescriptor;
    }
}

export default TsDescriptorDataComponent;
