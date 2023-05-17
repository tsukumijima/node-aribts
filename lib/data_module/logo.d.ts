export = TsDataModuleLogo;
declare class TsDataModuleLogo {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        logo_type: number;
        number_of_loop: number;
        logos: any[];
    };
}
