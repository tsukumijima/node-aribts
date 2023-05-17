"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const crc32_1 = require("../crc32");
const TsReader = require("../reader");
const TsDescriptors = require("../descriptors");
function decode(buffer) {
    if ((0, crc32_1.calc)(buffer) !== 0)
        return null;
    const reader = new TsReader(buffer);
    const objEit = {
        _raw: buffer,
        table_id: reader.uimsbf(8),
        section_syntax_indicator: reader.bslbf(1)
    };
    reader.next(1);
    reader.next(2);
    objEit.section_length = reader.uimsbf(12);
    objEit.service_id = reader.uimsbf(16);
    reader.next(2);
    objEit.version_number = reader.uimsbf(5);
    objEit.current_next_indicator = reader.bslbf(1);
    objEit.section_number = reader.uimsbf(8);
    objEit.last_section_number = reader.uimsbf(8);
    objEit.transport_stream_id = reader.uimsbf(16);
    objEit.original_network_id = reader.uimsbf(16);
    objEit.segment_last_section_number = reader.uimsbf(8);
    objEit.last_table_id = reader.uimsbf(8);
    objEit.events = [];
    while (reader.position >> 3 < 3 + objEit.section_length - 4) {
        const event = {
            event_id: reader.uimsbf(16),
            start_time: reader.readBytes(5),
            duration: reader.readBytes(3),
            running_status: reader.uimsbf(3),
            free_CA_mode: reader.bslbf(1),
            descriptors_loop_length: reader.uimsbf(12)
        };
        event.descriptors = new TsDescriptors(reader.readBytesRaw(event.descriptors_loop_length)).decode();
        objEit.events.push(event);
    }
    objEit.CRC_32 = reader.readBytes(4);
    return objEit;
}
exports.decode = decode;
//# sourceMappingURL=eit.js.map