export = TsDescriptorService;
declare class TsDescriptorService {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        service_type: number;
        service_provider_name_length: number;
        service_provider_name_char: Buffer;
        service_name_length: number;
        service_name_char: Buffer;
    };
}
