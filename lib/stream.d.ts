/// <reference types="node" />
import { Buffer } from "buffer";
import { Transform } from "readable-stream";
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
        pat: {
            [key: string]: any;
        };
        cat: {
            [key: string]: any;
        };
        pmt: {
            [key: string]: any;
        };
        pmtPids: number[];
        pids: number[];
        rebuild: {
            pat: Buffer;
            patCounter: number;
            patVersion: number;
        };
    };
    constructor(options?: Partial<typeof TsStream.prototype.options>);
    toPacket(buffer: Buffer): {
        packets: Buffer[];
        buffer: Buffer | null;
    };
    parse(buffer: Buffer): Buffer | null;
    parsePat(pid: number, objPat: {
        [key: string]: any;
    }): void;
    parseCat(pid: number, objCat: {
        [key: string]: any;
    }): void;
    parsePmt(pid: number, objPmt: {
        [key: string]: any;
    }): void;
    updatePids(): void;
    rebuildPat(): void;
    createPat(): Buffer;
    _transform(chunk: any, encoding: string, callback: Function): void;
    _flush(callback: Function): void;
}
export default TsStream;
