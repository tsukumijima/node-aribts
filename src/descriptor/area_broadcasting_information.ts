import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorAreaBroadcastingInformation {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDescriptor._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'descriptor_tag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_length = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'num_of_station_point' does not exist on ... Remove this comment to see the full error message
        objDescriptor.num_of_station_point = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'station_points' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.station_points = [];

        // @ts-expect-error TS(2339): Property 'num_of_station_point' does not exist on ... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.num_of_station_point; i++) {
            let station_point = {};

            // @ts-expect-error TS(2339): Property 'station_id' does not exist on type '{}'.
            station_point.station_id = reader.uimsbf(24);
            // @ts-expect-error TS(2339): Property 'location_code' does not exist on type '{... Remove this comment to see the full error message
            station_point.location_code = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'broadcast_signal_format' does not exist ... Remove this comment to see the full error message
            station_point.broadcast_signal_format = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'additional_station_info_length' does not... Remove this comment to see the full error message
            station_point.additional_station_info_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'additional_station_info' does not exist ... Remove this comment to see the full error message
            station_point.additional_station_info = reader.readBytes(station_point.additional_station_info_length);

            // @ts-expect-error TS(2339): Property 'station_points' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.station_points.push(station_point);
        }

        return objDescriptor;
    }
}

export default TsDescriptorAreaBroadcastingInformation;
