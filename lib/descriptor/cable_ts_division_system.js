"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorCableTsDivisionSystem {
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
        objDescriptor.frequencies = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let frequency = {};
            frequency.frequency = reader.uimsbf(32);
            reader.next(7);
            frequency.future_use_flag = reader.bslbf(1);
            frequency.multiplex_frame_format_number = reader.uimsbf(4);
            frequency.FEC_outer = reader.uimsbf(4);
            frequency.modulation = reader.uimsbf(8);
            frequency.symbol_rate = reader.uimsbf(28);
            reader.next(4);
            if (frequency.future_use_flag === 0) {
                frequency.future_use_data_length = reader.uimsbf(8);
                frequency.future_use_data = reader.readBytes(frequency.future_use_data_length);
            }
            frequency.num_of_services = reader.uimsbf(28);
            frequency.services = [];
            for (let i = 0; i < frequency.num_of_services; i++) {
                let service = {};
                service.service_id = reader.uimsbf(16);
                frequency.services.push(service);
            }
            objDescriptor.frequencies.push(frequency);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorCableTsDivisionSystem;
//# sourceMappingURL=cable_ts_division_system.js.map