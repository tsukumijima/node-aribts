export = TsDescriptorBroadcasterName;
declare class TsDescriptorBroadcasterName {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        char: Buffer;
    };
}
