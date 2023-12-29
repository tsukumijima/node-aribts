import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTablePmt {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objPmt = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objPmt._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objPmt.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objPmt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // '0'
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objPmt.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'program_number' does not exist on type '... Remove this comment to see the full error message
        objPmt.program_number = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objPmt.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objPmt.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objPmt.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objPmt.last_section_number = reader.uimsbf(8);

        reader.next(3);    // reserved
        // @ts-expect-error TS(2339): Property 'PCR_PID' does not exist on type '{}'.
        objPmt.PCR_PID = reader.uimsbf(13);
        reader.next(4);    // reserved
        // @ts-expect-error TS(2339): Property 'program_info_length' does not exist on t... Remove this comment to see the full error message
        objPmt.program_info_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'program_info' does not exist on type '{}... Remove this comment to see the full error message
        objPmt.program_info = new TsDescriptors(reader.readBytesRaw(objPmt.program_info_length)).decode();

        // @ts-expect-error TS(2339): Property 'streams' does not exist on type '{}'.
        objPmt.streams = [];

        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        while (reader.position >> 3 < 3 + objPmt.section_length - 4) {
            let stream = {};

            // @ts-expect-error TS(2339): Property 'stream_type' does not exist on type '{}'... Remove this comment to see the full error message
            stream.stream_type = reader.uimsbf(8);
            reader.next(3);    // reserved
            // @ts-expect-error TS(2339): Property 'elementary_PID' does not exist on type '... Remove this comment to see the full error message
            stream.elementary_PID = reader.uimsbf(13);
            reader.next(4);    // reserved
            // @ts-expect-error TS(2339): Property 'ES_info_length' does not exist on type '... Remove this comment to see the full error message
            stream.ES_info_length = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'ES_info' does not exist on type '{}'.
            stream.ES_info = new TsDescriptors(reader.readBytesRaw(stream.ES_info_length)).decode();

            // @ts-expect-error TS(2339): Property 'streams' does not exist on type '{}'.
            objPmt.streams.push(stream);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objPmt.CRC_32 = reader.readBytes(4);

        return objPmt;
    }
}

export default TsTablePmt;
