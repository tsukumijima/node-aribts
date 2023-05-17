export = TsDescriptorReference;
declare class TsDescriptorReference {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        information_provider_id: number;
        event_relation_id: number;
        references: any[];
    };
}
