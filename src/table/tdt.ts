import { Buffer } from "buffer";
import TsReader from "../reader";

class TsTableTdt {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objTdt = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objTdt._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objTdt.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objTdt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objTdt.section_length = reader.uimsbf(12);

        // @ts-expect-error TS(2339): Property 'JST_time' does not exist on type '{}'.
        objTdt.JST_time = reader.readBytes(5);

        return objTdt;
    }
}

export default TsTableTdt;
