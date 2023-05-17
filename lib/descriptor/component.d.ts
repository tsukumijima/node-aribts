export = TsDescriptorComponent;
declare class TsDescriptorComponent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        stream_content: number;
        component_type: number;
        component_tag: number;
        ISO_639_language_code: Buffer;
        text_char: Buffer;
    };
}
