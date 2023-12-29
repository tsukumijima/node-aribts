"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorStcReference {
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
        reader.next(3);
        objDescriptor.external_event_flag = reader.bslbf(1);
        objDescriptor.STC_reference_mode = reader.uimsbf(4);
        if (objDescriptor.external_event_flag === 1) {
            objDescriptor.external_event_id = reader.uimsbf(16);
            objDescriptor.external_service_id = reader.uimsbf(16);
            objDescriptor.external_network_id = reader.uimsbf(16);
        }
        if (objDescriptor.STC_reference_mode === 0) {
        }
        else if (objDescriptor.STC_reference_mode === 1) {
            reader.next(7);
            objDescriptor.NPT_reference = reader.uimsbf(33);
            reader.next(7);
            objDescriptor.STC_reference = reader.uimsbf(33);
        }
        else if (objDescriptor.STC_reference_mode === 3 || objDescriptor.STC_reference_mode === 5) {
            objDescriptor.time_reference = reader.uimsbf(24);
            objDescriptor.time_reference_extention = reader.uimsbf(12);
            reader.next(11);
            objDescriptor.STC_reference = reader.uimsbf(33);
        }
        else {
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorStcReference;
//# sourceMappingURL=stc_reference.js.map