export = TsDescriptorCableTsDivisionSystem;
declare class TsDescriptorCableTsDivisionSystem {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        frequencies: any[];
    };
}
