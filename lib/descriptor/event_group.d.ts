export = TsDescriptorEventGroup;
declare class TsDescriptorEventGroup {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        group_type: number;
        event_count: number;
        events: any[];
        other_network_events: any[];
        private_data_byte: Buffer;
    };
}
