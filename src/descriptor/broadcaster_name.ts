import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorBroadcasterName {
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

        objDescriptor.char = reader.readBytes(objDescriptor.descriptor_length);

        return objDescriptor;
    }
}

export default TsDescriptorBroadcasterName;
