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
    const objBit = {
        _raw: buffer,
        table_id: reader.uimsbf(8),
        section_syntax_indicator: reader.bslbf(1)
    };
    reader.next(1);
    reader.next(2);
    objBit.section_length = reader.uimsbf(12);
    objBit.original_network_id = reader.uimsbf(16);
    reader.next(2);
    objBit.version_number = reader.uimsbf(5);
    objBit.current_next_indicator = reader.bslbf(1);
    objBit.section_number = reader.uimsbf(8);
    objBit.last_section_number = reader.uimsbf(8);
    reader.next(3);
    objBit.broadcast_view_propriety = reader.bslbf(1);
    objBit.first_descriptors_length = reader.uimsbf(12);
    objBit.first_descriptors = new TsDescriptors(reader.readBytesRaw(objBit.first_descriptors_length)).decode();
    objBit.broadcaster_descriptors = [];
    while ((reader.position >> 3) - 3 < objBit.section_length) {
        const broadcaster_id = reader.uimsbf(8);
        reader.next(4);
        const broadcaster_descriptors_length = reader.uimsbf(12);
        const descriptors = new TsDescriptors(reader.readBytesRaw(broadcaster_descriptors_length)).decode();
        objBit.broadcaster_descriptors.push({ broadcaster_id, descriptors });
    }
    objBit.CRC_32 = reader.readBytes(4);
    return objBit;
}
exports.decode = decode;
//# sourceMappingURL=bit.js.map