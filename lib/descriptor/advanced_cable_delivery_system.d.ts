export = TsDescriptorAdvancedCableDeliverySystem;
declare class TsDescriptorAdvancedCableDeliverySystem {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        extention_descriptor_tag: number;
        PLP_ID: number;
        effective_symbol_length: number;
        guard_interval: number;
        bundled_channel: number;
        frequencies: any[];
    };
}
