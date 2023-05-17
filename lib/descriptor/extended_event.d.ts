export = TsDescriptorExtendedEvent;
declare class TsDescriptorExtendedEvent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        descriptor_number: number;
        last_descriptor_number: number;
        ISO_639_language_code: Buffer;
        length_of_items: number;
        items: any[];
        text_length: number;
        text_char: Buffer;
    };
}
