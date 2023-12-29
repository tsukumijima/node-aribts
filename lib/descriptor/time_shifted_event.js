"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorTimeShiftedEvent {
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
        objDescriptor.reference_service_id = reader.uimsbf(16);
        objDescriptor.reference_event_id = reader.uimsbf(16);
        return objDescriptor;
    }
}
exports.default = TsDescriptorTimeShiftedEvent;
//# sourceMappingURL=time_shifted_event.js.map