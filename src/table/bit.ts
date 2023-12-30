import { Buffer } from "buffer";
import { calc } from "../crc32";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

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
    first_descriptors: { [key: string]: any }[];
    broadcaster_descriptors: BroadcasterDescriptor[];
    CRC_32: Buffer;
}

export interface BroadcasterDescriptor {
    broadcaster_id: number;
    descriptors: { [key: string]: any }[];
}

export function decode(buffer: Buffer): BIT {
    if (calc(buffer) !== 0) return null;

    const reader = new TsReader(buffer);
    const objBit: Partial<BIT> = {
        _raw: buffer,

        table_id: reader.uimsbf(8),
        section_syntax_indicator: reader.bslbf(1)
    };
    reader.next(1);    // reserved_future_use
    reader.next(2);    // reserved
    objBit.section_length = reader.uimsbf(12);
    objBit.original_network_id = reader.uimsbf(16);
    reader.next(2);    // reserved
    objBit.version_number = reader.uimsbf(5);
    objBit.current_next_indicator = reader.bslbf(1);
    objBit.section_number = reader.uimsbf(8);
    objBit.last_section_number = reader.uimsbf(8);
    reader.next(3);    // reserved_future_use

    objBit.broadcast_view_propriety = reader.bslbf(1);
    objBit.first_descriptors_length = reader.uimsbf(12);

    objBit.first_descriptors = new TsDescriptors(reader.readBytesRaw(objBit.first_descriptors_length)).decode();
    objBit.broadcaster_descriptors = [];
    while ((reader.position >> 3) - 3 < objBit.section_length) {
        const broadcaster_id = reader.uimsbf(8);
        reader.next(4); // reserved_future_use
        const broadcaster_descriptors_length = reader.uimsbf(12);
        const descriptors = new TsDescriptors(reader.readBytesRaw(broadcaster_descriptors_length)).decode();
        objBit.broadcaster_descriptors.push({ broadcaster_id, descriptors });
    }

    objBit.CRC_32 = reader.readBytes(4);

    return objBit as BIT;
}
