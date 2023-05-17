export = TsDescriptorDlProtection;
declare class TsDescriptorDlProtection {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        DL_system_ID: number;
        PID: number;
        encrypt_protocol_number: number;
        encrypt_info: Buffer;
    };
}
