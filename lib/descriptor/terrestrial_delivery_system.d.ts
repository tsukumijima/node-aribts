export = TsDescriptorTerrestrialDeliverySystem;
declare class TsDescriptorTerrestrialDeliverySystem {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        area_code: number;
        guard_interval: number;
        transmission_mode: number;
        frequencies: any[];
    };
}
