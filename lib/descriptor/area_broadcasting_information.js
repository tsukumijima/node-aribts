"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorAreaBroadcastingInformation {
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
        objDescriptor.num_of_station_point = reader.uimsbf(8);
        objDescriptor.station_points = [];
        for (let i = 0; i < objDescriptor.num_of_station_point; i++) {
            let station_point = {};
            station_point.station_id = reader.uimsbf(24);
            station_point.location_code = reader.uimsbf(16);
            station_point.broadcast_signal_format = reader.uimsbf(8);
            station_point.additional_station_info_length = reader.uimsbf(8);
            station_point.additional_station_info = reader.readBytes(station_point.additional_station_info_length);
            objDescriptor.station_points.push(station_point);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorAreaBroadcastingInformation;
//# sourceMappingURL=area_broadcasting_information.js.map