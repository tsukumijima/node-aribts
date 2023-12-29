import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableTot {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objTot: { [key: string]: any } = {};

        objTot._raw = this.buffer;

        objTot.table_id = reader.uimsbf(8);
        objTot.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        objTot.section_length = reader.uimsbf(12);

        objTot.JST_time = reader.readBytes(5);
        reader.next(4);    // reserved
        objTot.descriptors_loop_length = reader.uimsbf(12);
        objTot.descriptors = new TsDescriptors(reader.readBytesRaw(objTot.descriptors_loop_length)).decode();

        objTot.CRC_32 = reader.readBytes(4);

        return objTot;
    }
}

export default TsTableTot;
