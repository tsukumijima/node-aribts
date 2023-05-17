export = TsDescriptorDownloadContent;
declare class TsDescriptorDownloadContent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        reboot: number;
        add_on: number;
        compatibility_flag: number;
        module_info_flag: number;
        text_info_flag: number;
        component_size: number;
        download_id: number;
        time_out_value_DII: number;
        leak_rate: number;
        component_tag: number;
        compatibilityDescriptor: {
            _raw: any;
            compatibilityDescriptorLength: number;
            descriptorCount: number;
            descriptors: any[];
        };
        num_of_modules: number;
        modules: any[];
        private_data_length: number;
        private_data_byte: Buffer;
        ISO_639_language_code: Buffer;
        text_length: number;
        text_char: Buffer;
    };
}
