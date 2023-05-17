export = TsDescriptorPartialTransportStream;
declare class TsDescriptorPartialTransportStream {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        peak_rate: number;
        minimum_overall_smoothing_rate: number;
        maximum_overall_smoothing_buffer: number;
    };
}
