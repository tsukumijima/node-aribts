export = TsDescriptorCaStartup;
declare class TsDescriptorCaStartup {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CA_system_ID: number;
        CA_program_ID: number;
        second_load_flag: number;
        load_indicator: number;
        exclusion_ID_num: number;
        exclusion_ID: any[];
        load_security_info_len: number;
        load_security_info_byte: Buffer;
        private_data_byte: Buffer;
    };
}
