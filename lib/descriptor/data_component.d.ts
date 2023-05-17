export = TsDescriptorDataComponent;
declare class TsDescriptorDataComponent {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        data_component_id: number;
        additional_data_component_info: Buffer;
    };
}
