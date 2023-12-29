import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorDataStreamAlignment {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor: { [key: string]: any } = {};

        objDescriptor._raw = this.buffer;

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        objDescriptor.alignment_type = reader.uimsbf(8);

        return objDescriptor;
    }
}

export default TsDescriptorDataStreamAlignment;
