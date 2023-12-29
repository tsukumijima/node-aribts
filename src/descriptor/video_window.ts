import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorVideoWindow {
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

        // @ts-expect-error TS(2339): Property 'horizontal_offset' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.horizontal_offset = reader.uimsbf(14);
        // @ts-expect-error TS(2339): Property 'vertical_offset' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.vertical_offset = reader.uimsbf(14);
        // @ts-expect-error TS(2339): Property 'window_priority' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.window_priority = reader.uimsbf(4);

        return objDescriptor;
    }
}

export default TsDescriptorVideoWindow;
