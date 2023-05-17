export = TsStream;
declare class TsStream extends Transform {
    constructor(options?: {});
    options: {
        transform: boolean;
        skipSize: number;
        packetSize: number;
        bufferSize: number;
        transPmtIds: any[];
        transPmtSids: any[];
        transPmtPids: any[];
        transPids: any[];
    };
    buffer: TsBuffer;
    info: {};
    trans: {
        pat: any;
        cat: any;
        pmt: {};
        pmtPids: any[];
        pids: any[];
        rebuild: {
            pat: any;
            patCounter: number;
            patVersion: number;
        };
    };
    toPacket(buffer: any): {
        packets: any[];
        buffer: any;
    };
    parse(buffer: any): any;
    parsePat(pid: any, objPat: any): void;
    parseCat(pid: any, objCat: any): void;
    parsePmt(pid: any, objPmt: any): void;
    updatePids(): void;
    rebuildPat(): void;
    createPat(): Buffer;
    _transform(chunk: any, encoding: any, callback: any): void;
    _flush(callback: any): void;
}
import { Transform } from "stream";
import { TsBuffer } from "./buffer";
