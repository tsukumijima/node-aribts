export = TsDescriptorCountryAvailability;
declare class TsDescriptorCountryAvailability {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        country_availability_flag: number;
        country_availabilities: any[];
    };
}
