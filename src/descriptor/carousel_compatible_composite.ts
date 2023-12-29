import { Buffer } from "buffer";
import TsReader from "../reader";
import TsModuleDescriptors from "../module_descriptors";

class TsDescriptorCarouselCompatibleComposite {
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

        objDescriptor.sub_descriptors = new TsModuleDescriptors(reader.readBytesRaw(2 + objDescriptor.descriptor_length - (reader.position >> 3))).decode();

        return objDescriptor;
    }
}

export default TsDescriptorCarouselCompatibleComposite;
