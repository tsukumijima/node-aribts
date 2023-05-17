export = TsDescriptorNearVideoOnDemandReference;
declare class TsDescriptorNearVideoOnDemandReference {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        NVOD_references: any[];
    };
}
