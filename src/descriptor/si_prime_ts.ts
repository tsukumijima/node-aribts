import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorSiPrimeTs {
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

        objDescriptor.parameter_version = reader.uimsbf(8);
        objDescriptor.update_time = reader.uimsbf(16);
        objDescriptor.SI_prime_ts_network_id = reader.uimsbf(16);
        objDescriptor.SI_prime_transport_stream_id = reader.uimsbf(16);
        objDescriptor.tables = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let table: { [key: string]: any } = {};

            table.table_id = reader.uimsbf(8);
            table.table_description_length = reader.uimsbf(8);
            table.table_description_byte = reader.readBytes(table.table_description_length);

            objDescriptor.tables.push(table);
        }

        return objDescriptor;
    }
}

export default TsDescriptorSiPrimeTs;
