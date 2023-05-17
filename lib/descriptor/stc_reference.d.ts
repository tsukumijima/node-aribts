export = TsDescriptorStcReference;
declare class TsDescriptorStcReference {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        external_event_flag: number;
        STC_reference_mode: number;
        external_event_id: number;
        external_service_id: number;
        external_network_id: number;
        NPT_reference: number;
        STC_reference: number;
        time_reference: number;
        time_reference_extention: number;
    };
}
