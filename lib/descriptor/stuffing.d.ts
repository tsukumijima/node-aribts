export = TsDescriptorStuffing;
declare class TsDescriptorStuffing {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        stuffing_byte: Buffer;
    };
}
