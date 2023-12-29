import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableBat {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objBat = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objBat._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objBat.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objBat.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objBat.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'bouquet_id' does not exist on type '{}'.
        objBat.bouquet_id = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objBat.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objBat.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objBat.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objBat.last_section_number = reader.uimsbf(8);

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'bouquet_descriptors_length' does not exi... Remove this comment to see the full error message
        objBat.bouquet_descriptors_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'bouquet_descriptors' does not exist on t... Remove this comment to see the full error message
        objBat.bouquet_descriptors = new TsDescriptors(reader.readBytesRaw(objBat.bouquet_descriptors_length)).decode();

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'transport_stream_loop_length' does not e... Remove this comment to see the full error message
        objBat.transport_stream_loop_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'transport_streams' does not exist on typ... Remove this comment to see the full error message
        objBat.transport_streams = [];

        // @ts-expect-error TS(2339): Property 'transport_stream_loop_length' does not e... Remove this comment to see the full error message
        for (let length = (reader.position >> 3) + objBat.transport_stream_loop_length; reader.position >> 3 < length; ) {
            let transport_stream = {};

            // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
            transport_stream.transport_stream_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
            transport_stream.original_network_id = reader.uimsbf(16);
            reader.next(4);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'transport_descriptors_length' does not e... Remove this comment to see the full error message
            transport_stream.transport_descriptors_length = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'transport_descriptors' does not exist on... Remove this comment to see the full error message
            transport_stream.transport_descriptors = new TsDescriptors(reader.readBytesRaw(transport_stream.transport_descriptors_length)).decode();

            // @ts-expect-error TS(2339): Property 'transport_streams' does not exist on typ... Remove this comment to see the full error message
            objBat.transport_streams.push(transport_stream);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objBat.CRC_32 = reader.readBytes(4);

        return objBat;
    }
}

export default TsTableBat;
