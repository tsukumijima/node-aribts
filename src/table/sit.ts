"use strict";
import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableSit {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objSit = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objSit._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objSit.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objSit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // reserved_future_use
        reader.next(2);    // ISO_reserved
        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        objSit.section_length = reader.uimsbf(12);
        reader.next(16);    // reserved_future_use
        reader.next(2);    // ISO_reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objSit.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objSit.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objSit.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objSit.last_section_number = reader.uimsbf(8);

        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'transmission_info_loop_length' does not ... Remove this comment to see the full error message
        objSit.transmission_info_loop_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'transmission_info' does not exist on typ... Remove this comment to see the full error message
        objSit.transmission_info = new TsDescriptors(reader.readBytesRaw(objSit.transmission_info_loop_length)).decode();

        // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
        objSit.services = [];

        // @ts-expect-error TS(2339): Property 'section_length' does not exist on type '... Remove this comment to see the full error message
        while (reader.position >> 3 < 3 + objSit.section_length - 4) {
            let service = {};

            // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
            service.service_id = reader.uimsbf(16);
            reader.next(1);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'running_status' does not exist on type '... Remove this comment to see the full error message
            service.running_status = reader.bslbf(3);
            // @ts-expect-error TS(2339): Property 'service_loop_length' does not exist on t... Remove this comment to see the full error message
            service.service_loop_length = reader.uimsbf(12);
            // @ts-expect-error TS(2339): Property 'service' does not exist on type '{}'.
            service.service = new TsDescriptors(reader.readBytesRaw(service.service_loop_length)).decode();

            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            objSit.services.push(service);
        }

        // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
        objSit.CRC_32 = reader.readBytes(4);

        return objSit;
    }
}

export default TsTableSit;
