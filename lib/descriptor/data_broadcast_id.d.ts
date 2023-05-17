export = TsDescriptorDataBroadcastId;
declare class TsDescriptorDataBroadcastId {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        data_broadcast_id: number;
        id_selector_byte: Buffer;
    };
}
