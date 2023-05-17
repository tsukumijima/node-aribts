export = TsDescriptorContentAvailability;
declare class TsDescriptorContentAvailability {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        copy_restriction_mode: number;
        image_constraint_token: number;
        retention_mode: number;
        retention_state: number;
        encryption_mode: number;
    };
}
