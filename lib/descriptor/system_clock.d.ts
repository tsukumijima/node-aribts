export = TsDescriptorSystemClock;
declare class TsDescriptorSystemClock {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        external_clock_reference_indicator: number;
        clock_accuracy_integer: number;
        clock_accuracy_exponent: number;
    };
}
