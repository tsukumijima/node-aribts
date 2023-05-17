export = TsDescriptorLocalTimeOffset;
declare class TsDescriptorLocalTimeOffset {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        local_time_offsets: any[];
    };
}
