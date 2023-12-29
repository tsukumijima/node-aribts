import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorLdtLinkage {
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

        objDescriptor.original_service_id = reader.uimsbf(16);
        objDescriptor.transport_stream_id = reader.uimsbf(16);
        objDescriptor.original_network_id = reader.uimsbf(16);
        objDescriptor.descriptions = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let description: { [key: string]: any } = {};

            description.description_id = reader.uimsbf(16);
            reader.uimsbf(4);    // reserved_future_use
            description.description_type = reader.uimsbf(4);
            description.user_defined = reader.bslbf(8);

            objDescriptor.descriptions.push(description);
        }

        return objDescriptor;
    }
}

export default TsDescriptorLdtLinkage;
