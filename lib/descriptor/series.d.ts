export = TsDescriptorSeries;
declare class TsDescriptorSeries {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        series_id: number;
        repeat_label: number;
        program_pattern: number;
        expire_date_valid_flag: number;
        expire_date: number;
        episode_number: number;
        last_episode_number: number;
        series_name_char: Buffer;
    };
}
