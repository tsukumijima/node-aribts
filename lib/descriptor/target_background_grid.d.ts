export = TsDescriptorTargetBackgroundGrid;
declare class TsDescriptorTargetBackgroundGrid {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        horizontal_size: number;
        vertical_size: number;
        aspect_ratio_information: number;
    };
}
