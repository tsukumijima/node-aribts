export = TsDescriptorStreamIdentifier;
declare class TsDescriptorStreamIdentifier {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        component_tag: number;
    };
}
