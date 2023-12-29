import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableSdtt {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objSdtt = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objSdtt._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objSdtt.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objSdtt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objSdtt.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'table_id_ext' does not exist on type '{}... Remove this comment to see the full error message
        objSdtt.table_id_ext = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objSdtt.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objSdtt.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objSdtt.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objSdtt.last_section_number = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
        objSdtt.transport_stream_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
        objSdtt.original_network_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
        objSdtt.service_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'num_of_contents' does not exist on type ... Remove this comment to see the full error message
        objSdtt.num_of_contents = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'contents' does not exist on type '{}'.
        objSdtt.contents = [];

        // @ts-expect-error TS(2339): Property 'num_of_contents' does not exist on type ... Remove this comment to see the full error message
        for (let i = 0; i < objSdtt.num_of_contents; i++) {
            let content = {};

            // @ts-expect-error TS(2339): Property 'group' does not exist on type '{}'.
            content.group = reader.bslbf(4);
            // @ts-expect-error TS(2339): Property 'target_version' does not exist on type '... Remove this comment to see the full error message
            content.target_version = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'new_version' does not exist on type '{}'... Remove this comment to see the full error message
            content.new_version = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'download_level' does not exist on type '... Remove this comment to see the full error message
            content.download_level = reader.bslbf(2);
            // @ts-expect-error TS(2339): Property 'version_indicator' does not exist on typ... Remove this comment to see the full error message
            content.version_indicator = reader.bslbf(2);
            // @ts-expect-error TS(2339): Property 'content_description_length' does not exi... Remove this comment to see the full error message
            content.content_description_length = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'maker_id_flag' does not exist on type '{... Remove this comment to see the full error message
            content.maker_id_flag = reader.bslbf(1);
            reader.next(3);    // reserved
            // @ts-expect-error TS(2339): Property 'schedule_description_length' does not ex... Remove this comment to see the full error message
            content.schedule_description_length = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'schedule_time_shift_information' does no... Remove this comment to see the full error message
            content.schedule_time_shift_information = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'schedule_descriptions' does not exist on... Remove this comment to see the full error message
            content.schedule_descriptions = [];

            // @ts-expect-error TS(2339): Property 'schedule_description_length' does not ex... Remove this comment to see the full error message
            for (let length = (reader.position >> 3) + content.schedule_description_length; reader.position >> 3 < length; ) {
                let schedule_description = {};

                // @ts-expect-error TS(2339): Property 'start_time' does not exist on type '{}'.
                schedule_description.start_time = reader.readBytes(5);
                // @ts-expect-error TS(2339): Property 'duration' does not exist on type '{}'.
                schedule_description.duration = reader.readBytes(3);

                // @ts-expect-error TS(2339): Property 'schedule_descriptions' does not exist on... Remove this comment to see the full error message
                content.schedule_descriptions.push(schedule_description);
            }

            // @ts-expect-error TS(2339): Property 'descriptors' does not exist on type '{}'... Remove this comment to see the full error message
            content.descriptors = new TsDescriptors(reader.readBytesRaw(content.content_description_length - content.schedule_description_length)).decode();

            // @ts-expect-error TS(2339): Property 'contents' does not exist on type '{}'.
            objSdtt.contents.push(content);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objSdtt.CRC_32 = reader.readBytes(4);

        return objSdtt;
    }
}

export default TsTableSdtt;
