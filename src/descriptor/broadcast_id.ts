import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorBroadcastId {
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

        objDescriptor.original_network_id = reader.uimsbf(16);
        objDescriptor.transport_stream_id = reader.uimsbf(16);
        objDescriptor.event_id = reader.uimsbf(16);
        objDescriptor.broadcaster_id = reader.uimsbf(8);

        return objDescriptor;
    }
}

export default TsDescriptorBroadcastId;
