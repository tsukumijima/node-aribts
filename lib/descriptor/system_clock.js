"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorSystemClock {
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
        objDescriptor.external_clock_reference_indicator = reader.bslbf(1);
        reader.next(1);
        objDescriptor.clock_accuracy_integer = reader.uimsbf(6);
        objDescriptor.clock_accuracy_exponent = reader.uimsbf(3);
        reader.next(5);
        return objDescriptor;
    }
}
exports.default = TsDescriptorSystemClock;
//# sourceMappingURL=system_clock.js.map