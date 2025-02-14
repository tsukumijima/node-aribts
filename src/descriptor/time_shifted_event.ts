import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorTimeShiftedEvent {
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

        objDescriptor.reference_service_id = reader.uimsbf(16);
        objDescriptor.reference_event_id = reader.uimsbf(16);

        return objDescriptor;
    }
}

export default TsDescriptorTimeShiftedEvent;
