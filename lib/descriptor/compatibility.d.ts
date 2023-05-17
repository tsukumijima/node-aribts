export = TsDescriptorCompatibility;
declare class TsDescriptorCompatibility {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        compatibilityDescriptorLength: number;
        descriptorCount: number;
        descriptors: any[];
    };
}
