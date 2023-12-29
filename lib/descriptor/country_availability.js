"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorCountryAvailability {
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
        objDescriptor.country_availability_flag = reader.bslbf(1);
        reader.next(7);
        objDescriptor.country_availabilities = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let country = {};
            country.country_code = reader.readBytes(3);
            objDescriptor.country_availabilities.push(country);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorCountryAvailability;
//# sourceMappingURL=country_availability.js.map