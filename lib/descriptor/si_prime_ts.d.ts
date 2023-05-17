export = TsDescriptorSiPrimeTs;
declare class TsDescriptorSiPrimeTs {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        parameter_version: number;
        update_time: number;
        SI_prime_ts_network_id: number;
        SI_prime_transport_stream_id: number;
        tables: any[];
    };
}
