import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSystemClock {
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

        objDescriptor.external_clock_reference_indicator = reader.bslbf(1);
        reader.next(1);    // reserved
        objDescriptor.clock_accuracy_integer = reader.uimsbf(6);
        objDescriptor.clock_accuracy_exponent = reader.uimsbf(3);
        reader.next(5);    // reserved

        return objDescriptor;
    }
}

export default TsDescriptorSystemClock;
