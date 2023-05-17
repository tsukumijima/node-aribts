export = TsTableSdtt;
declare class TsTableSdtt {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        table_id: number;
        section_syntax_indicator: number;
        section_length: number;
        table_id_ext: number;
        version_number: number;
        current_next_indicator: number;
        section_number: number;
        last_section_number: number;
        transport_stream_id: number;
        original_network_id: number;
        service_id: number;
        num_of_contents: number;
        contents: any[];
        CRC_32: Buffer;
    };
}
