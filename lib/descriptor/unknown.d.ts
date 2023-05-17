export = TsDescriptorUnknown;
declare class TsDescriptorUnknown {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        descriptor: Buffer;
    };
}
