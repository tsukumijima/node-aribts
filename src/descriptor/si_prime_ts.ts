import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSiPrimeTs {
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

        // @ts-expect-error TS(2339): Property 'parameter_version' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.parameter_version = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'update_time' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.update_time = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'SI_prime_ts_network_id' does not exist o... Remove this comment to see the full error message
        objDescriptor.SI_prime_ts_network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'SI_prime_transport_stream_id' does not e... Remove this comment to see the full error message
        objDescriptor.SI_prime_transport_stream_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'tables' does not exist on type '{}'.
        objDescriptor.tables = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let table = {};

            // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
            table.table_id = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'table_description_length' does not exist... Remove this comment to see the full error message
            table.table_description_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'table_description_byte' does not exist o... Remove this comment to see the full error message
            table.table_description_byte = reader.readBytes(table.table_description_length);

            // @ts-expect-error TS(2339): Property 'tables' does not exist on type '{}'.
            objDescriptor.tables.push(table);
        }

        return objDescriptor;
    }
}

export default TsDescriptorSiPrimeTs;
