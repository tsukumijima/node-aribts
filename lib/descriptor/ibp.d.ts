export = TsDescriptorIbp;
declare class TsDescriptorIbp {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        closed_gop_flag: number;
        identical_gop_flag: number;
        max_gop_length: number;
    };
}
