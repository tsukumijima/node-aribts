export = TsDescriptorCaEmmTs;
declare class TsDescriptorCaEmmTs {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CA_system_id: number;
        transport_stream_id: number;
        original_network_id: number;
        power_supply_period: number;
    };
}
