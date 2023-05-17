export = TsDescriptorNetworkIdentification;
declare class TsDescriptorNetworkIdentification {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        country_code: Buffer;
        media_type: number;
        network_id: number;
        private_data: Buffer;
    };
}
