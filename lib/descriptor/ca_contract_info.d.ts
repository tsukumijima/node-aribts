export = TsDescriptorCaContractInfo;
declare class TsDescriptorCaContractInfo {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        CA_system_id: number;
        CA_unit_id: number;
        num_of_component: number;
        components: any[];
        contract_verification_info_length: number;
        contract_verification_info: Buffer;
        fee_name_length: number;
        fee_name: Buffer;
    };
}
