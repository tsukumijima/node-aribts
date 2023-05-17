export = TsDescriptorIso639Language;
declare class TsDescriptorIso639Language {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        ISO_639_languages: any[];
    };
}
