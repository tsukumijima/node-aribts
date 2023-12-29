import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorConnectedTransmission {
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

        objDescriptor.connected_transmission_group_id = reader.uimsbf(16);
        objDescriptor.segment_type = reader.bslbf(2);
        objDescriptor.modulation_type_A = reader.bslbf(2);
        objDescriptor.modulation_type_B = reader.bslbf(2);
        objDescriptor.modulation_type_C = reader.bslbf(2);
        objDescriptor.additional_connected_transmission_info = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorConnectedTransmission;
