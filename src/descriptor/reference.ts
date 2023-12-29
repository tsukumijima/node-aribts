import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorReference {
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

        objDescriptor.information_provider_id = reader.uimsbf(16);
        objDescriptor.event_relation_id = reader.uimsbf(16);
        objDescriptor.references = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let reference: { [key: string]: any } = {};

            reference.reference_node_id = reader.uimsbf(16);
            reference.reference_number = reader.uimsbf(8);
            reference.last_reference_number = reader.uimsbf(8);

            objDescriptor.references.push(reference);
        }

        return objDescriptor;
    }
}

export default TsDescriptorReference;
