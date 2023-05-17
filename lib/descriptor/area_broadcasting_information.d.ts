export = TsDescriptorAreaBroadcastingInformation;
declare class TsDescriptorAreaBroadcastingInformation {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        num_of_station_point: number;
        station_points: any[];
    };
}
