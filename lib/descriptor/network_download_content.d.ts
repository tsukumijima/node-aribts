export = TsDescriptorNetworkDownloadContent;
declare class TsDescriptorNetworkDownloadContent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        reboot: number;
        add_on: number;
        compatibility_flag: number;
        text_info_flag: number;
        component_size: number;
        session_protcol_number: number;
        session_id: number;
        retry: number;
        connect_timer: number;
        address_type: number;
        ipv4_address: any;
        port_number: number;
        ipv6_address: any;
        URL_length: number;
        URL_byte: any;
        compatibilityDescriptor: {
            _raw: any;
            compatibilityDescriptorLength: number;
            descriptorCount: number;
            descriptors: any[];
        };
        private_data_length: number;
        private_data_byte: Buffer;
        ISO_639_language_code: number;
        text_length: number;
        text_char: Buffer;
    };
}
