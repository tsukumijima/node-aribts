/// <reference path="../src/types.d.ts" />
/// <reference types="node" />
/// <reference types="node" />
import { Buffer } from "buffer";
import { Transform } from "stream-browserify";
import { TsInfo } from "./info";
import { TsBuffer } from "./buffer";
declare class TsStream extends Transform {
    buffer: TsBuffer;
    info: {
        [pid: number]: TsInfo;
    };
    options: {
        transform: boolean;
        skipSize: number;
        packetSize: number;
        bufferSize: number;
        transPmtIds: number[];
        transPmtSids: number[];
        transPmtPids: number[];
        transPids: number[];
    };
    trans: {
        pat: any;
        cat: any;
        pmt: any;
        pmtPids: number[];
        pids: number[];
        rebuild: {
            pat: any;
            patCounter: number;
            patVersion: number;
        };
    };
    constructor(options?: {});
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
export default TsStream;
