import { Buffer } from "buffer";
import TsReader from "../reader";

class TsModuleDescriptorCrc32 {
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

        objDescriptor.CRC_32 = reader.readBytes(4);

        return objDescriptor;
    }
}

export default TsModuleDescriptorCrc32;
