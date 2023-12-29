/// <reference types="node" />
import { Buffer } from "buffer";
export interface BIT {
    _raw: Buffer;
    table_id: number;
    section_syntax_indicator: number;
    section_length: number;
    original_network_id: number;
    version_number: number;
    current_next_indicator: number;
    section_number: number;
    last_section_number: number;
    broadcast_view_propriety: number;
    first_descriptors_length: number;
    last_table_id: number;
    first_descriptors: any[];
    broadcaster_descriptors: BroadcasterDescriptor[];
    CRC_32: Buffer;
}
export interface BroadcasterDescriptor {
    broadcaster_id: number;
    descriptors: any[];
}
export declare function decode(buffer: Buffer): BIT;
