import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorConditionalPlayback {
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

        objDescriptor.conditional_playback_id = reader.uimsbf(16);
        reader.next(3);    // '111'
        objDescriptor.conditional_playback_PID = reader.uimsbf(13);

        return objDescriptor;
    }
}

export default TsDescriptorConditionalPlayback;
