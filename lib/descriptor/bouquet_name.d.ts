export = TsDescriptorBouquetName;
declare class TsDescriptorBouquetName {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        bouquet_name_char: Buffer;
    };
}
