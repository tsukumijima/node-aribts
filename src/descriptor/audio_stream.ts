import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorAudioStream {
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

        objDescriptor.free_format_flag = reader.bslbf(1);
        objDescriptor.ID = reader.bslbf(1);
        objDescriptor.layer = reader.bslbf(2);
        objDescriptor.variable_rate_audio_indicator = reader.bslbf(1);
        reader.next(3);    // reserved

        return objDescriptor;
    }
}

export default TsDescriptorAudioStream;
