"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorCaContractInfo {
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
        objDescriptor.CA_system_id = reader.uimsbf(16);
        objDescriptor.CA_unit_id = reader.uimsbf(4);
        objDescriptor.num_of_component = reader.uimsbf(4);
        objDescriptor.components = [];
        for (let i = 0; i < objDescriptor.num_of_component; i++) {
            let component = {};
            component.component_tag = reader.uimsbf(8);
            objDescriptor.components.push(component);
        }
        objDescriptor.contract_verification_info_length = reader.uimsbf(8);
        objDescriptor.contract_verification_info = reader.readBytes(objDescriptor.contract_verification_info_length);
        objDescriptor.fee_name_length = reader.uimsbf(8);
        objDescriptor.fee_name = reader.readBytes(objDescriptor.fee_name_length);
        return objDescriptor;
    }
}
exports.default = TsDescriptorCaContractInfo;
//# sourceMappingURL=ca_contract_info.js.map