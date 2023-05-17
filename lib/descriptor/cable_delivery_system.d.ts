export = TsDescriptorCableDeliverySystem;
declare class TsDescriptorCableDeliverySystem {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        frequency: number;
        frame_type: number;
        FEC_outer: number;
        modulation: number;
        symbol_rate: number;
        FEC_inner: number;
    };
}
