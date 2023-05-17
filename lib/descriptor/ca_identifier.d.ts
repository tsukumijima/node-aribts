export = TsDescriptorCaIdentifier;
declare class TsDescriptorCaIdentifier {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CAs: any[];
    };
}
