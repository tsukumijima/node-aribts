export = TsDescriptorEmergencyInformation;
declare class TsDescriptorEmergencyInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        services: any[];
    };
}
