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
        let objTot = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objTot._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objTot.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objTot.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objTot.section_length = reader.uimsbf(12);

        // @ts-expect-error TS(2339): Property 'JST_time' does not exist on type '{}'.
        objTot.JST_time = reader.readBytes(5);
        reader.next(4);    // reserved
        // @ts-expect-error TS(2339): Property 'descriptors_loop_length' does not exist ... Remove this comment to see the full error message
        objTot.descriptors_loop_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'descriptors' does not exist on type '{}'... Remove this comment to see the full error message
        objTot.descriptors = new TsDescriptors(reader.readBytesRaw(objTot.descriptors_loop_length)).decode();

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objTot.CRC_32 = reader.readBytes(4);

        return objTot;
    }
}

export default TsTableTot;
