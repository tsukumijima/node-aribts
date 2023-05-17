export = TsDescriptorMaterialInformation;
declare class TsDescriptorMaterialInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        descriptor_number: number;
        last_descriptor_number: number;
        number_of_material_set: number;
        material_sets: any[];
    };
}
