export = TsModuleDescriptorCrc32;
declare class TsModuleDescriptorCrc32 {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CRC_32: Buffer;
    };
}
