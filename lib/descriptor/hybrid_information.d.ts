export = TsDescriptorHybridInformation;
declare class TsDescriptorHybridInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        has_location: number;
        location_type: number;
        format: number;
        component_tag: number;
        module_id: number;
        URL_length: number;
        URL_byte: Buffer;
    };
}
