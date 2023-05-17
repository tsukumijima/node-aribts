export = TsDescriptorLinkage;
declare class TsDescriptorLinkage {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        transport_stream_id: number;
        original_network_id: number;
        service_id: number;
        linkage_type: number;
        private_data_byte: Buffer;
    };
}
