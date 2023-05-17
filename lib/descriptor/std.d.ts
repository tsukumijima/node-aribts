export = TsDescriptorStd;
declare class TsDescriptorStd {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        leak_valid_flag: number;
    };
}
