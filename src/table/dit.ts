import { Buffer } from "buffer";
import TsReader from "../reader";

class TsTableDit {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDit = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDit._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objDit.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objDit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // Reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objDit.section_length = reader.uimsbf(12);

        // @ts-expect-error TS(2339): Property 'transition_flag' does not exist on type ... Remove this comment to see the full error message
        objDit.transition_flag = reader.uimsbf(1);

        return objDit;
    }
}

export default TsTableDit;
