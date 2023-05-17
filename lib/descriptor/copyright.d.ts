export = TsDescriptorCopyright;
declare class TsDescriptorCopyright {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        copyright_identifier: Buffer;
        additional_copyright_info: Buffer;
    };
}
