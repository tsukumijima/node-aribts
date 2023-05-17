export = TsDescriptorScrambleSystem;
declare class TsDescriptorScrambleSystem {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        scramble_system_id: number;
    };
}
