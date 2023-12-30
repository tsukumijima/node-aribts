/// <reference types="node" />
import { Buffer } from "buffer";
export interface EIT {
    _raw: Buffer;
    table_id: number;
    section_syntax_indicator: number;
    section_length: number;
    service_id: number;
    version_number: number;
    current_next_indicator: number;
    section_number: number;
    last_section_number: number;
    transport_stream_id: number;
    original_network_id: number;
    segment_last_section_number: number;
    last_table_id: number;
    events: Event[];
    CRC_32: Buffer;
}
export interface Event {
    event_id: number;
    start_time: Buffer;
    duration: Buffer;
    running_status: number;
    free_CA_mode: number;
    descriptors_loop_length: number;
    descriptors: {
        [key: string]: any;
    }[];
}
export declare function decode(buffer: Buffer): EIT;
