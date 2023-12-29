import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorContentAvailability {
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

        reader.next(1);    // reserved_future_use
        objDescriptor.copy_restriction_mode = reader.bslbf(1);
        objDescriptor.image_constraint_token = reader.bslbf(1);
        objDescriptor.retention_mode = reader.bslbf(1);
        objDescriptor.retention_state = reader.bslbf(3);
        objDescriptor.encryption_mode = reader.bslbf(1);

        return objDescriptor;
    }
}

export default TsDescriptorContentAvailability;
