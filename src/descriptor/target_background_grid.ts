import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorTargetBackgroundGrid {
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

        objDescriptor.horizontal_size = reader.uimsbf(14);
        objDescriptor.vertical_size = reader.uimsbf(14);
        objDescriptor.aspect_ratio_information = reader.uimsbf(4);

        return objDescriptor;
    }
}

export default TsDescriptorTargetBackgroundGrid;
