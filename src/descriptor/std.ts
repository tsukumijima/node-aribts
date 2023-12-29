import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorStd {
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

        reader.next(7);    // reserved
        objDescriptor.leak_valid_flag = reader.bslbf(1);

        return objDescriptor;
    }
}

export default TsDescriptorStd;
