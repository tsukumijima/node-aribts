export = TsDescriptorShortEvent;
declare class TsDescriptorShortEvent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        ISO_639_language_code: Buffer;
        event_name_length: number;
        event_name_char: Buffer;
        text_length: number;
        text_char: Buffer;
    };
}
