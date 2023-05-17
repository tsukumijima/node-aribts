export = TsDescriptorRegistration;
declare class TsDescriptorRegistration {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        format_identifier: number;
        additional_identification_info: Buffer;
    };
}
