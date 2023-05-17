export = TsDescriptorTimeShiftedService;
declare class TsDescriptorTimeShiftedService {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        reference_service_id: number;
    };
}
