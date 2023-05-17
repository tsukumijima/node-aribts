export = TsDescriptorNodeRelation;
declare class TsDescriptorNodeRelation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        reference_type: number;
        external_reference_flag: number;
        information_provider_id: number;
        event_relation_id: number;
        reference_node_id: number;
        reference_number: number;
    };
}
