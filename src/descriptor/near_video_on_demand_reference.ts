import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorNearVideoOnDemandReference {
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

        objDescriptor.NVOD_references = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let NVOD_reference: { [key: string]: any } = {};

            NVOD_reference.transport_stream_id = reader.uimsbf(16);
            NVOD_reference.original_network_id = reader.uimsbf(16);
            NVOD_reference.service_id = reader.uimsbf(16);

            objDescriptor.NVOD_references.push(NVOD_reference);
        }

        return objDescriptor;
    }
}

export default TsDescriptorNearVideoOnDemandReference;
