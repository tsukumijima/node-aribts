import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableCdt {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objCdt = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objCdt._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objCdt.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objCdt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objCdt.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'download_data_id' does not exist on type... Remove this comment to see the full error message
        objCdt.download_data_id = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objCdt.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objCdt.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objCdt.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objCdt.last_section_number = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
        objCdt.original_network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'data_type' does not exist on type '{}'.
        objCdt.data_type = reader.uimsbf(8);
        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'descriptors_loop_length' does not exist ... Remove this comment to see the full error message
        objCdt.descriptors_loop_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'descriptors' does not exist on type '{}'... Remove this comment to see the full error message
        objCdt.descriptors = new TsDescriptors(reader.readBytesRaw(objCdt.descriptors_loop_length)).decode();
        // @ts-expect-error TS(2339): Property 'data_module_byte' does not exist on type... Remove this comment to see the full error message
        objCdt.data_module_byte = reader.readBytes(3 + objCdt.section_length - (reader.position >> 3) - 4);

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objCdt.CRC_32 = reader.readBytes(4);

        return objCdt;
    }
}

export default TsTableCdt;
