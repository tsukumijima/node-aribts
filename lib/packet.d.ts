/// <reference types="node" />
import { Buffer } from "buffer";
interface Packet {
    _raw: Buffer;
    sync_byte: number;
    transport_error_indicator: number;
    payload_unit_start_indicator: number;
    transport_priority: number;
    PID: number;
    transport_scrambling_control: number;
    adaptation_field_control: number;
    continuity_counter: number;
    adaptation_field?: AdaptationField;
    data_byte?: Buffer;
}
interface AdaptationField {
    _raw: Buffer;
    adaptation_field_length: number;
    discontinuity_indicator?: number;
    random_access_indicator?: number;
    elementary_stream_priority_indicator?: number;
    PCR_flag?: number;
    OPCR_flag?: number;
    splicing_point_flag?: number;
    transport_private_data_flag?: number;
    adaptation_field_extension_flag?: number;
    program_clock_reference_base?: number;
    program_clock_reference_extension?: number;
    original_program_clock_reference_base?: number;
    original_program_clock_reference_extension?: number;
    splice_countdown?: number;
    transport_private_data_length?: number;
    private_data_byte?: Buffer;
    adaptation_field_extension_length?: number;
    ltw_flag?: number;
    piecewise_rate_flag?: number;
    seamless_splice_flag?: number;
    ltw_valid_flag?: number;
    ltw_offset?: number;
    piecewise_rate?: number;
    splice_type?: number;
    DTS_next_AU_32_30?: number;
    DTS_next_AU_29_15?: number;
    DTS_next_AU_14_0?: number;
}
declare class TsPacket {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): Packet;
    decodeAdaptationField(): AdaptationField;
    decodeBasic(): Packet;
    encode(objPacket: Packet): Buffer;
    static isPes(buffer: Buffer): boolean;
    static getAdaptationField(buffer: Buffer): Buffer;
    static getData(buffer: Buffer): Buffer;
}
export default TsPacket;
