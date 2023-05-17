export = TsDescriptorAudioStream;
declare class TsDescriptorAudioStream {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        free_format_flag: number;
        ID: number;
        layer: number;
        variable_rate_audio_indicator: number;
    };
}
