export = TsDescriptorBoardInformation;
declare class TsDescriptorBoardInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        title_length: number;
        title_char: Buffer;
        text_length: number;
        text_char: Buffer;
    };
}
