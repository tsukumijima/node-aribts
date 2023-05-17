export = TsDescriptorAccessControl;
declare class TsDescriptorAccessControl {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CA_system_id: number;
        transmission_type: number;
        PID: number;
        private_data_byte: Buffer;
    };
}
