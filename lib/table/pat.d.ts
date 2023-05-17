export = TsTablePat;
declare class TsTablePat {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        table_id: number;
        section_syntax_indicator: number;
        section_length: number;
        transport_stream_id: number;
        version_number: number;
        current_next_indicator: number;
        section_number: number;
        last_section_number: number;
        programs: any[];
        CRC_32: Buffer;
    };
    encode(objPat: any): any;
}
