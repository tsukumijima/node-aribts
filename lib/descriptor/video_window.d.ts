export = TsDescriptorVideoWindow;
declare class TsDescriptorVideoWindow {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        horizontal_offset: number;
        vertical_offset: number;
        window_priority: number;
    };
}
