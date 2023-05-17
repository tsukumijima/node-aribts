export = TsDescriptorHierarchy;
declare class TsDescriptorHierarchy {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        temporal_scalability_flag: number;
        spatial_scalability_flag: number;
        quality_scalability_flag: number;
        hierarchy_type: number;
        hierarchy_layer_index: number;
        tref_present_flag: number;
        hierarchy_embedded_layer_index: number;
        hierarchy_channel: number;
    };
}
