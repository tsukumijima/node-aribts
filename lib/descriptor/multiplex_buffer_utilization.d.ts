export = TsDescriptorMultiplexBufferUtilization;
declare class TsDescriptorMultiplexBufferUtilization {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        bound_valid_flag: number;
        LTW_offset_lower_bound: number;
        LTW_offset_upper_bound: number;
    };
}
