export = TsDescriptorVideoStream;
declare class TsDescriptorVideoStream {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        multiple_frame_rate_flag: number;
        frame_rate_code: number;
        MPEG_1_only_flag: number;
        constrained_parameter_flag: number;
        still_picture_flag: number;
        profile_and_level_indication: number;
        chroma_format: number;
        frame_rate_extension_flag: number;
    };
}
