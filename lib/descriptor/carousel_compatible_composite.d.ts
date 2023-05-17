export = TsDescriptorCarouselCompatibleComposite;
declare class TsDescriptorCarouselCompatibleComposite {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        sub_descriptors: ({
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            position: number;
            moduleId: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CRC_32: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            descriptor: Buffer;
        })[];
    };
}
