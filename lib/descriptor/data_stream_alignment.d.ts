export = TsDescriptorDataStreamAlignment;
declare class TsDescriptorDataStreamAlignment {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        alignment_type: number;
    };
}
