export = TsDescriptorConditionalAccess;
declare class TsDescriptorConditionalAccess {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CA_system_ID: number;
        CA_PID: number;
        private_data_byte: Buffer;
    };
}
