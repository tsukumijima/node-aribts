import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCopyright {
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

        objDescriptor.copyright_identifier = reader.readBytes(4);
        objDescriptor.additional_copyright_info = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorCopyright;
