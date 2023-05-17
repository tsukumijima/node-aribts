export = TsDescriptorCaService;
declare class TsDescriptorCaService {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CA_system_id: number;
        ca_broadcaster_group_id: number;
        message_control: number;
        services: any[];
    };
}
