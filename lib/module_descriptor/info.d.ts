export = TsModuleDescriptorInfo;
declare class TsModuleDescriptorInfo {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        ISO_639_language_code: Buffer;
        text_char: Buffer;
    };
}
