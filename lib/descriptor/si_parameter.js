"use strict";
const TsReader = require("../reader");
function decodeSINIT(buffer) {
    let reader = new TsReader(buffer);
    let obj = {};
    obj._raw = buffer;
    obj.table_id = reader.uimsbf(8);
    obj.table_description_length = reader.uimsbf(8);
    obj.table_cycle = reader.uimsbf(8);
    return obj;
}
function decodeSISecondTableCycle(buffer) {
    let reader = new TsReader(buffer);
    let obj = {};
    obj._raw = buffer;
    obj.table_id = reader.uimsbf(8);
    obj.table_description_length = reader.uimsbf(8);
    obj.table_cycle = reader.uimsbf(16);
    return obj;
}
function decodeSI4E(buffer) {
    let reader = new TsReader(buffer);
    let obj = {};
    obj._raw = buffer;
    obj.table_id = reader.uimsbf(8);
    obj.table_description_length = reader.uimsbf(8);
    obj.table_cycle_H_EIT = reader.uimsbf(8);
    obj.table_cycle_M_EIT = reader.uimsbf(8);
    obj.table_cycle_L_EIT = reader.uimsbf(8);
    obj.num_of_M_EIT_event = reader.uimsbf(4);
    obj.num_of_L_EIT_event = reader.uimsbf(4);
    return obj;
}
function decodeSI50(buffer) {
    let reader = new TsReader(buffer);
    let obj = {};
    obj._raw = buffer;
    obj.table_id = reader.uimsbf(8);
    obj.table_description_length = reader.uimsbf(8);
    obj.loops = [];
    while (obj.table_description_length + 2 > reader.position >> 3) {
        const media_type = reader.uimsbf(2);
        const pattern = reader.uimsbf(2);
        const EIT_other_flag = reader.uimsbf(1);
        reader.next(3);
        const schedule_range = reader.uimsbf(8);
        const base_cycle = reader.uimsbf(12);
        reader.next(2);
        const cycle_group_count = reader.uimsbf(2);
        const cycles = [];
        for (let i = 0; i < cycle_group_count; i++) {
            const num_of_segment = reader.uimsbf(8);
            const cycle = reader.uimsbf(8);
            cycles.push({ num_of_segment, cycle });
        }
        obj.loops.push({ media_type, pattern, EIT_other_flag, schedule_range, base_cycle, cycle_group_count, cycles });
    }
    return obj;
}
class TsDescriptorSiParameter {
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};
        objDescriptor._raw = this.buffer;
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);
        objDescriptor.parameter_version = reader.uimsbf(8);
        objDescriptor.update_time = reader.uimsbf(16);
        objDescriptor.table_descriptions = [];
        while (objDescriptor.descriptor_length + 2 > reader.position >> 3) {
            const table_id = reader.uimsbf(8);
            const table_description_length = reader.uimsbf(8);
            reader.previous(16);
            const bytes = reader.readBytes(table_description_length + 2);
            switch (table_id) {
                case 0x40:
                    objDescriptor.table_descriptions.push(decodeSINIT(bytes));
                    break;
                case 0xC4:
                    objDescriptor.table_descriptions.push(decodeSINIT(bytes));
                    break;
                case 0x42:
                    objDescriptor.table_descriptions.push(decodeSINIT(bytes));
                    break;
                case 0x46:
                    objDescriptor.table_descriptions.push(decodeSINIT(bytes));
                    break;
                case 0x4E:
                    objDescriptor.table_descriptions.push(decodeSI4E(bytes));
                    break;
                case 0x4F:
                    objDescriptor.table_descriptions.push(decodeSI4E(bytes));
                    break;
                case 0x50:
                case 0x60:
                case 0x58:
                    objDescriptor.table_descriptions.push(decodeSI50(bytes));
                    break;
                case 0xC3:
                    objDescriptor.table_descriptions.push(decodeSISecondTableCycle(bytes));
                    break;
                case 0xC8:
                    objDescriptor.table_descriptions.push(decodeSISecondTableCycle(bytes));
                    break;
                default:
                    objDescriptor.table_descriptions.push({ table_id, table_description_length, _raw: bytes });
                    break;
            }
        }
        return objDescriptor;
    }
}
module.exports = TsDescriptorSiParameter;
//# sourceMappingURL=si_parameter.js.map