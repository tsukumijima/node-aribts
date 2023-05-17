export = TsDescriptorNetworkName;
declare class TsDescriptorNetworkName {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        network_name_char: Buffer;
    };
}
