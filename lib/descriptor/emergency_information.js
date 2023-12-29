"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorEmergencyInformation {
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
        objDescriptor.services = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let service = {};
            service.service_id = reader.uimsbf(16);
            service.start_end_flag = reader.bslbf(1);
            service.signal_level = reader.bslbf(1);
            reader.next(6);
            service.area_code_length = reader.uimsbf(8);
            service.area_codes = [];
            for (let length = (reader.position >> 3) + objDescriptor.area_code_length; reader.position >> 3 < length;) {
                let area_code = {};
                area_code.area_code = reader.bslbf(12);
                reader.next(4);
                service.area_codes.push(area_code);
            }
            objDescriptor.services.push(service);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorEmergencyInformation;
//# sourceMappingURL=emergency_information.js.map