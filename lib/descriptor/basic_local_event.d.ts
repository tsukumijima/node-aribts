export = TsDescriptorBasicLocalEvent;
declare class TsDescriptorBasicLocalEvent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        segmentation_mode: number;
        segmentation_info_length: number;
        start_time_NPT: number;
        end_time_NPT: number;
        start_time: number;
        duration: number;
        start_time_extension: number;
        duration_extension: number;
        component_tags: any[];
    };
}
