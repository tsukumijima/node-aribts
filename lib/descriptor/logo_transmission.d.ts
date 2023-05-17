export = TsDescriptorLogoTransmission;
declare class TsDescriptorLogoTransmission {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        logo_transmission_type: number;
        logo_id: number;
        logo_version: number;
        download_data_id: number;
        logo_char: Buffer;
    };
}
