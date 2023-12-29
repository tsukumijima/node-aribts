import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorService {
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

        objDescriptor.service_type = reader.uimsbf(8);
        objDescriptor.service_provider_name_length = reader.uimsbf(8);
        objDescriptor.service_provider_name_char = reader.readBytes(objDescriptor.service_provider_name_length);
        objDescriptor.service_name_length = reader.uimsbf(8);
        objDescriptor.service_name_char = reader.readBytes(objDescriptor.service_name_length);

        return objDescriptor;
    }
}

export default TsDescriptorService;
