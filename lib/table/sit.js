"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsCrc32 = require("../crc32");
const reader_1 = require("../reader");
const descriptors_1 = require("../descriptors");
class TsTableSit {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        if (TsCrc32.calc(this.buffer) !== 0)
            return null;
        let reader = new reader_1.default(this.buffer);
        let objSit = {};
        objSit._raw = this.buffer;
        objSit.table_id = reader.uimsbf(8);
        objSit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objSit.section_length = reader.uimsbf(12);
        reader.next(16);
        reader.next(2);
        objSit.version_number = reader.uimsbf(5);
        objSit.current_next_indicator = reader.bslbf(1);
        objSit.section_number = reader.uimsbf(8);
        objSit.last_section_number = reader.uimsbf(8);
        reader.next(4);
        objSit.transmission_info_loop_length = reader.uimsbf(12);
        objSit.transmission_info = new descriptors_1.default(reader.readBytesRaw(objSit.transmission_info_loop_length)).decode();
        objSit.services = [];
        while (reader.position >> 3 < 3 + objSit.section_length - 4) {
            let service = {};
            service.service_id = reader.uimsbf(16);
            reader.next(1);
            service.running_status = reader.bslbf(3);
            service.service_loop_length = reader.uimsbf(12);
            service.service = new descriptors_1.default(reader.readBytesRaw(service.service_loop_length)).decode();
            objSit.services.push(service);
        }
        objSit.CRC_32 = reader.readBytes(4);
        return objSit;
    }
}
exports.default = TsTableSit;
//# sourceMappingURL=sit.js.map