export = TsDataModuleCdtLogo;
declare class TsDataModuleCdtLogo {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        logo_type: number;
        logo_id: number;
        logo_version: number;
        data_size: number;
        data_byte: Buffer;
    };
}
