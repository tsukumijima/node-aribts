export = TsDescriptorConnectedTransmission;
declare class TsDescriptorConnectedTransmission {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        connected_transmission_group_id: number;
        segment_type: number;
        modulation_type_A: number;
        modulation_type_B: number;
        modulation_type_C: number;
        additional_connected_transmission_info: Buffer;
    };
}
