"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsCrc32 = require("../crc32");
const reader_1 = require("../reader");
const descriptors_1 = require("../descriptors");
class TsTableNit {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        if (TsCrc32.calc(this.buffer) !== 0)
            return null;
        let reader = new reader_1.default(this.buffer);
        let objNit = {};
        objNit._raw = this.buffer;
        objNit.table_id = reader.uimsbf(8);
        objNit.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);
        reader.next(2);
        objNit.section_length = reader.uimsbf(12);
        objNit.network_id = reader.uimsbf(16);
        reader.next(2);
        objNit.version_number = reader.uimsbf(5);
        objNit.current_next_indicator = reader.bslbf(1);
        objNit.section_number = reader.uimsbf(8);
        objNit.last_section_number = reader.uimsbf(8);
        reader.next(4);
        objNit.network_descriptors_length = reader.uimsbf(12);
        objNit.network_descriptors = new descriptors_1.default(reader.readBytesRaw(objNit.network_descriptors_length)).decode();
        reader.next(4);
        objNit.transport_stream_loop_length = reader.uimsbf(12);
        objNit.transport_streams = [];
        for (let length = (reader.position >> 3) + objNit.transport_stream_loop_length; reader.position >> 3 < length;) {
            let transport_stream = {};
            transport_stream.transport_stream_id = reader.uimsbf(16);
            transport_stream.original_network_id = reader.uimsbf(16);
            reader.next(4);
            transport_stream.transport_descriptors_length = reader.uimsbf(12);
            transport_stream.transport_descriptors = new descriptors_1.default(reader.readBytesRaw(transport_stream.transport_descriptors_length)).decode();
            objNit.transport_streams.push(transport_stream);
        }
        objNit.CRC_32 = reader.readBytes(4);
        return objNit;
    }
}
exports.default = TsTableNit;
//# sourceMappingURL=nit.js.map