export = TsDescriptorVideoDecodeControl;
declare class TsDescriptorVideoDecodeControl {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        still_picture_flag: number;
        sequence_end_code_flag: number;
        video_encode_format: number;
    };
}
