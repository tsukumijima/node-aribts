import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorPrivateDataIndicator {
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

        objDescriptor.private_data_indicator = reader.readBytes(4);

        return objDescriptor;
    }
}

export default TsDescriptorPrivateDataIndicator;
