import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorBouquetName {
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

        objDescriptor.bouquet_name_char = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorBouquetName;
