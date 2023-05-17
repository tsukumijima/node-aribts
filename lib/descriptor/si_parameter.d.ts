export = TsDescriptorSiParameter;
declare class TsDescriptorSiParameter {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        parameter_version: number;
        update_time: number;
        table_descriptions: any[];
    };
}
