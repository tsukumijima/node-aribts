export = TsDescriptorHierarchicalTransmission;
declare class TsDescriptorHierarchicalTransmission {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        quality_level: number;
        reference_PID: number;
    };
}
