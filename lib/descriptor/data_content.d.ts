export = TsDescriptorDataContent;
declare class TsDescriptorDataContent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        data_component_id: number;
        entry_component: number;
        selector_length: number;
        selector_byte: Buffer;
        num_of_component_ref: number;
        component_ref: Buffer;
        ISO_639_language_code: Buffer;
        text_length: number;
        text_char: Buffer;
    };
}
