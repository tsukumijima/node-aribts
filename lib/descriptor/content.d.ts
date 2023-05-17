export = TsDescriptorContent;
declare class TsDescriptorContent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        contents: any[];
    };
}
