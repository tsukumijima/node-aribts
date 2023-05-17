export = TsDescriptorTimeShiftedEvent;
declare class TsDescriptorTimeShiftedEvent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        reference_service_id: number;
        reference_event_id: number;
    };
}
