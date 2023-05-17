export = TsDescriptorLdtLinkage;
declare class TsDescriptorLdtLinkage {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        original_service_id: number;
        transport_stream_id: number;
        original_network_id: number;
        descriptions: any[];
    };
}
