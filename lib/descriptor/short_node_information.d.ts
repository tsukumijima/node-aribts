export = TsDescriptorShortNodeInformation;
declare class TsDescriptorShortNodeInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        ISO_639_language_code: number;
        node_name_length: number;
        node_name_char: Buffer;
        text_length: number;
        text_char: Buffer;
    };
}
