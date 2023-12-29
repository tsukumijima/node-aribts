import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorHyperlink {
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

        objDescriptor.hyper_linkage_type = reader.uimsbf(8);
        objDescriptor.link_destination_type = reader.uimsbf(8);
        objDescriptor.selector_length = reader.uimsbf(8);
        objDescriptor.selector = reader.readBytes(objDescriptor.selector_length);
        objDescriptor.private_data = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorHyperlink;
