export = TsDescriptorMosaic;
declare class TsDescriptorMosaic {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        mosaic_entry_point: number;
        number_of_horizontal_elementary_cells: number;
        number_of_vertical_elementary_cells: number;
        logical_cells: any[];
    };
}
