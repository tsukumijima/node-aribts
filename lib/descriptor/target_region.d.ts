export = TsDescriptorTargetRegion;
declare class TsDescriptorTargetRegion {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        region_spec_type: number;
        target_region_spec: {
            prefecture_bitmap: Buffer;
        };
    };
}
