"use strict";
const TsReader = require("../reader");
class TsDescriptorSystemClock {
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new TsReader(this.buffer);
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
module.exports = TsDescriptorSystemClock;
//# sourceMappingURL=system_clock.js.map