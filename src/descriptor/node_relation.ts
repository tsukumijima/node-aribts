import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorNodeRelation {
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

        objDescriptor.reference_type = reader.uimsbf(4);
        objDescriptor.external_reference_flag = reader.bslbf(1);
        reader.next(3);    // reserved_future_use

        if (objDescriptor.external_reference_flag === 1) {
            objDescriptor.information_provider_id = reader.uimsbf(16);
            objDescriptor.event_relation_id = reader.uimsbf(16);
        }

        objDescriptor.reference_node_id = reader.uimsbf(16);
        objDescriptor.reference_number = reader.uimsbf(8);

        return objDescriptor;
    }
}

export default TsDescriptorNodeRelation;
