export = TsDescriptorSatelliteDeliverySystem;
declare class TsDescriptorSatelliteDeliverySystem {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        frequency: number;
        orbital_position: number;
        west_east_flag: number;
        polarisation: number;
        modulation: number;
        symbol_rate: number;
        FEC_inner: number;
    };
}
