import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsWriter from "../writer";

class TsTablePat {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objPat = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objPat._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objPat.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objPat.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // '0'
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objPat.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
        objPat.transport_stream_id = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objPat.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objPat.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objPat.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objPat.last_section_number = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'programs' does not exist on type '{}'.
        objPat.programs = [];

        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        while (reader.position >> 3 < 3 + objPat.section_length - 4) {
            let program = {};

            // @ts-expect-error TS(2339): Property 'program_number' does not exist on type '... Remove this comment to see the full error message
            program.program_number = reader.uimsbf(16);
            reader.next(3);    // reserved
            // @ts-expect-error TS(2339): Property 'program_number' does not exist on type '... Remove this comment to see the full error message
            if (program.program_number === 0) {
                // @ts-expect-error TS(2339): Property 'network_PID' does not exist on type '{}'... Remove this comment to see the full error message
                program.network_PID = reader.uimsbf(13);
            } else {
                // @ts-expect-error TS(2339): Property 'program_map_PID' does not exist on type ... Remove this comment to see the full error message
                program.program_map_PID = reader.uimsbf(13);
            }

            // @ts-expect-error TS(2339): Property 'programs' does not exist on type '{}'.
            objPat.programs.push(program);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objPat.CRC_32 = reader.readBytes(4);

        return objPat;
    }

    encode(objPat) {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        let writer = new TsWriter(this.buffer);
        let pos;

        writer.uimsbf(8, objPat.table_id);
        writer.bslbf(1, objPat.section_syntax_indicator);
        writer.bslbf(1, 0);    // '0'
        writer.bslbf(2, 0b11);    // reserved
        writer.next(12);    // section_length
        writer.uimsbf(16, objPat.transport_stream_id);
        writer.bslbf(2, 0b11);    // reserved
        writer.uimsbf(5, objPat.version_number);
        writer.bslbf(1, objPat.current_next_indicator);
        writer.uimsbf(8, objPat.section_number);
        writer.uimsbf(8, objPat.last_section_number);

        objPat.programs.forEach(program => {
            writer.uimsbf(16, program.program_number);
            writer.bslbf(3, 0);    // reserved
            if (program.program_number === 0) {
                writer.uimsbf(13, program.network_PID);
            } else {
                writer.uimsbf(13, program.program_map_PID);
            }
        });

        pos = writer.position >> 3;
        writer.position = 12;
        writer.uimsbf(12, pos - 3 + 4);
        writer.position = pos << 3;

        pos = writer.position >> 3;
        writer.writeBytes(4, TsCrc32.calcToBuffer(this.buffer.slice(0, pos)));

        return this.buffer.slice(0, pos + 4);
    }
}

export default TsTablePat;
