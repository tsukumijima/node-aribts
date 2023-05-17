export = TsDescriptorTsInformation;
declare class TsDescriptorTsInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        remote_control_key_id: number;
        length_of_ts_name: number;
        transmission_type_count: number;
        ts_name_char: Buffer;
        transmission_types: any[];
    };
}
