import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableNit {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objNit = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objNit._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objNit.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objNit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objNit.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'network_id' does not exist on type '{}'.
        objNit.network_id = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objNit.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objNit.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objNit.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objNit.last_section_number = reader.uimsbf(8);

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'network_descriptors_length' does not exi... Remove this comment to see the full error message
        objNit.network_descriptors_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'network_descriptors' does not exist on t... Remove this comment to see the full error message
        objNit.network_descriptors = new TsDescriptors(reader.readBytesRaw(objNit.network_descriptors_length)).decode();

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'transport_stream_loop_length' does not e... Remove this comment to see the full error message
        objNit.transport_stream_loop_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'transport_streams' does not exist on typ... Remove this comment to see the full error message
        objNit.transport_streams = [];

        // @ts-expect-error TS(2339): Property 'transport_stream_loop_length' does not e... Remove this comment to see the full error message
        for (let length = (reader.position >> 3) + objNit.transport_stream_loop_length; reader.position >> 3 < length; ) {
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
            objNit.transport_streams.push(transport_stream);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objNit.CRC_32 = reader.readBytes(4);

        return objNit;
    }
}

export default TsTableNit;
