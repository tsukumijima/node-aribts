export = TsDescriptorPartialTransportStreamTime;
declare class TsDescriptorPartialTransportStreamTime {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        event_version_number: number;
        event_start_time: Buffer;
        duration: Buffer;
        offset: Buffer;
        offset_flag: number;
        other_descriptor_status: number;
        jst_time_flag: number;
        jst_time: Buffer;
    };
}
