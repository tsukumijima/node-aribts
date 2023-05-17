export = TsDescriptorHyperlink;
declare class TsDescriptorHyperlink {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        hyper_linkage_type: number;
        link_destination_type: number;
        selector_length: number;
        selector: Buffer;
        private_data: Buffer;
    };
}
