export = TsDescriptorPrivateDataIndicator;
declare class TsDescriptorPrivateDataIndicator {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        private_data_indicator: Buffer;
    };
}
