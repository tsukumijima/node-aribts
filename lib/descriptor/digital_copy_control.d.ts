export = TsDescriptorDigitalCopyControl;
declare class TsDescriptorDigitalCopyControl {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        digital_recording_control_data: number;
        maximum_bitrate_flag: number;
        component_control_flag: number;
        user_defined: number;
        maximum_bitrate: number;
        component_control_length: number;
        component_controls: any[];
    };
}
