import { Buffer } from "buffer";
import TsReader from "../reader";

class TsTableDit {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDit: { [key: string]: any } = {};

        objDit._raw = this.buffer;

        objDit.table_id = reader.uimsbf(8);
        objDit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // Reserved
        objDit.section_length = reader.uimsbf(12);

        objDit.transition_flag = reader.uimsbf(1);

        return objDit;
    }
}

export default TsTableDit;
