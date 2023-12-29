import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorNetworkIdentification {
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

        objDescriptor.country_code = reader.readBytes(3);
        objDescriptor.media_type = reader.bslbf(16);
        objDescriptor.network_id = reader.uimsbf(16);
        objDescriptor.private_data = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorNetworkIdentification;
