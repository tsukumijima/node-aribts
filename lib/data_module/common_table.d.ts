export = TsDataModuleCommonTable;
declare class TsDataModuleCommonTable {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        number_of_loop: number;
        common_tables: any[];
    };
}
