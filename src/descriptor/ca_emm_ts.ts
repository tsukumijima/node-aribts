import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCaEmmTs {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDescriptor._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'descriptor_tag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_length = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'CA_system_id' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.CA_system_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.transport_stream_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
        objDescriptor.original_network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'power_supply_period' does not exist on t... Remove this comment to see the full error message
        objDescriptor.power_supply_period = reader.uimsbf(8);

        return objDescriptor;
    }
}

export default TsDescriptorCaEmmTs;
