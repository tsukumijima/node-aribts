export = TsDataModuleKeywordTable;
declare class TsDataModuleKeywordTable {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        number_of_loop: number;
        keyword_tables: any[];
    };
}
