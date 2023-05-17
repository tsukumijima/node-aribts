export = TsDescriptorSystemManagement;
declare class TsDescriptorSystemManagement {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        system_management_id: number;
        additional_identification_info: Buffer;
    };
}
