export = TsModuleDescriptorUnknown;
declare class TsModuleDescriptorUnknown {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        descriptor: Buffer;
    };
}
