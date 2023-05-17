export = TsDescriptorAudioComponent;
declare class TsDescriptorAudioComponent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        stream_content: number;
        component_type: number;
        component_tag: number;
        stream_type: number;
        simulcast_group_tag: number;
        ES_multi_lingual_flag: number;
        main_component_flag: number;
        quality_indicator: number;
        sampling_rate: number;
        ISO_639_language_code: Buffer;
        ISO_639_language_code_2: Buffer;
        text_char: Buffer;
    };
}
