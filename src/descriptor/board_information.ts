import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorBoardInformation {
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

        // @ts-expect-error TS(2339): Property 'title_length' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.title_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'title_char' does not exist on type '{}'.
        objDescriptor.title_char = reader.readBytes(objDescriptor.title_length);
        // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.text_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
        objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);

        return objDescriptor;
    }
}

export default TsDescriptorBoardInformation;
