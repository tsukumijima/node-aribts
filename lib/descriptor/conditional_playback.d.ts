export = TsDescriptorConditionalPlayback;
declare class TsDescriptorConditionalPlayback {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        conditional_playback_id: number;
        conditional_playback_PID: number;
    };
}
