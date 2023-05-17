export = TsDescriptorComponentGroup;
declare class TsDescriptorComponentGroup {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        component_group_type: number;
        total_bit_rate_flag: number;
        num_of_group: number;
        groups: any[];
    };
}
