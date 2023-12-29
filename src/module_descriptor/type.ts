import { Buffer } from "buffer";
import TsReader from "../reader";

class TsModuleDescriptorType {
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

        objDescriptor.text_char = reader.readBytes(objDescriptor.descriptor_length);

        return objDescriptor;
    }
}

export default TsModuleDescriptorType;
