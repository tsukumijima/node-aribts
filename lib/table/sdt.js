"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsCrc32 = require("../crc32");
const reader_1 = require("../reader");
const descriptors_1 = require("../descriptors");
class TsTableSdt {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        if (TsCrc32.calc(this.buffer) !== 0)
            return null;
        let reader = new reader_1.default(this.buffer);
        let objSdt = {};
        objSdt._raw = this.buffer;
        objSdt.table_id = reader.uimsbf(8);
        objSdt.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objSdt.section_length = reader.uimsbf(12);
        objSdt.transport_stream_id = reader.uimsbf(16);
        reader.next(2);
        objSdt.version_number = reader.uimsbf(5);
        objSdt.current_next_indicator = reader.bslbf(1);
        objSdt.section_number = reader.uimsbf(8);
        objSdt.last_section_number = reader.uimsbf(8);
        objSdt.original_network_id = reader.uimsbf(16);
        reader.next(8);
        objSdt.services = [];
        while (reader.position >> 3 < 3 + objSdt.section_length - 4) {
            let service = {};
            service.service_id = reader.uimsbf(16);
            reader.next(3);
            service.EIT_user_defined_flags = reader.bslbf(3);
            service.EIT_schedule_flag = reader.bslbf(1);
            service.EIT_present_following_flag = reader.bslbf(1);
            service.running_status = reader.uimsbf(3);
            service.free_CA_mode = reader.bslbf(1);
            service.descriptors_loop_length = reader.uimsbf(12);
            service.descriptors = new descriptors_1.default(reader.readBytesRaw(service.descriptors_loop_length)).decode();
            objSdt.services.push(service);
        }
        objSdt.CRC_32 = reader.readBytes(4);
        return objSdt;
    }
}
exports.default = TsTableSdt;
//# sourceMappingURL=sdt.js.map