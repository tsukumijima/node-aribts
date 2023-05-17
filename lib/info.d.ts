import { TsBuffer } from "./buffer";
export declare class TsInfo {
    name: string;
    packet: number;
    counter: number;
    duplication: number;
    type: number;
    drop: number;
    scrambling: number;
    buffer: TsBuffer;
    constructor();
    toObject(): {
        packet: number;
        drop: number;
        scrambling: number;
    };
}
