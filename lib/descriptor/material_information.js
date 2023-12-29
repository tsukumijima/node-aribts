"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorMaterialInformation {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objDescriptor = {};
        objDescriptor._raw = this.buffer;
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);
        objDescriptor.descriptor_number = reader.uimsbf(4);
        objDescriptor.last_descriptor_number = reader.uimsbf(4);
        objDescriptor.number_of_material_set = reader.uimsbf(8);
        objDescriptor.material_sets = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let material_set = {};
            material_set.material_type = reader.uimsbf(8);
            material_set.material_name_length = reader.uimsbf(8);
            material_set.material_name_char = reader.readBytes(material_set.material_name_length);
            material_set.material_code_type = reader.uimsbf(8);
            material_set.material_code_length = reader.uimsbf(8);
            material_set.material_code_char = reader.readBytes(material_set.material_code_length);
            material_set.material_period_flag = reader.bslbf(1);
            reader.next(7);
            if (material_set.material_period_flag === 1) {
                material_set.material_period = reader.readBytes(3);
            }
            material_set.material_url_type = reader.uimsbf(8);
            material_set.material_url_length = reader.uimsbf(8);
            material_set.material_url_char = reader.readBytes(material_set.material_url_length);
            material_set.reserved_future_use_length = reader.uimsbf(8);
            reader.next(8 * material_set.reserved_future_use_length);
            objDescriptor.material_sets.push(material_set);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorMaterialInformation;
//# sourceMappingURL=material_information.js.map