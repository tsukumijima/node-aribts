import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableSdt {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objSdt = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objSdt._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objSdt.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objSdt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objSdt.section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
        objSdt.transport_stream_id = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objSdt.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objSdt.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objSdt.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objSdt.last_section_number = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
        objSdt.original_network_id = reader.uimsbf(16);
        reader.next(8);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
        objSdt.services = [];

        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        while (reader.position >> 3 < 3 + objSdt.section_length - 4) {
            let service = {};

            // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
            service.service_id = reader.uimsbf(16);
            reader.next(3);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'EIT_user_defined_flags' does not exist o... Remove this comment to see the full error message
            service.EIT_user_defined_flags = reader.bslbf(3);
            // @ts-expect-error TS(2339): Property 'EIT_schedule_flag' does not exist on typ... Remove this comment to see the full error message
            service.EIT_schedule_flag = reader.bslbf(1);
            // @ts-expect-error TS(2339): Property 'EIT_present_following_flag' does not exi... Remove this comment to see the full error message
            service.EIT_present_following_flag = reader.bslbf(1);
            // @ts-expect-error TS(2339): Property 'running_status' does not exist on type '... Remove this comment to see the full error message
            service.running_status = reader.uimsbf(3);
            // @ts-expect-error TS(2339): Property 'free_CA_mode' does not exist on type '{}... Remove this comment to see the full error message
            service.free_CA_mode = reader.bslbf(1);
            // @ts-expect-error TS(2339): Property 'descriptors_loop_length' does not exist ... Remove this comment to see the full error message
            service.descriptors_loop_length = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'descriptors' does not exist on type '{}'... Remove this comment to see the full error message
            service.descriptors = new TsDescriptors(reader.readBytesRaw(service.descriptors_loop_length)).decode();

            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            objSdt.services.push(service);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objSdt.CRC_32 = reader.readBytes(4);

        return objSdt;
    }
}

export default TsTableSdt;
