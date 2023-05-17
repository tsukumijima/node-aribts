export = TsTableTdt;
declare class TsTableTdt {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        table_id: number;
        section_syntax_indicator: number;
        section_length: number;
        JST_time: Buffer;
    };
}
