export = TsModuleDescriptorModuleLink;
declare class TsModuleDescriptorModuleLink {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        position: number;
        moduleId: number;
    };
}
