export = TsDescriptorServiceGroup;
declare class TsDescriptorServiceGroup {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        service_group_type: number;
        service_groups: any[];
        private_data_byte: Buffer;
    };
}
