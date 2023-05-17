export = TsDescriptorSmoothingBuffer;
declare class TsDescriptorSmoothingBuffer {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        sb_leak_rate: number;
        sb_size: number;
    };
}
