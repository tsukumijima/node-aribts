export = TsModuleDescriptorType;
declare class TsModuleDescriptorType {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        text_char: Buffer;
    };
}
