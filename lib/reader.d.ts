/// <reference types="node" />
declare class TsReader {
    buffer: Buffer;
    position: number;
    constructor(buffer: Buffer, position?: number);
    readBitsRaw(length: number): number;
    readBits(length: number): number;
    readBytesRaw(length: number): Buffer;
    readBytes(length: number): Buffer;
    next(length: number): void;
    previous(length: number): void;
    bslbf(length: number): number;
    uimsbf(length: number): number;
    tcimsbf(length: number): number;
    rpchof(length: number): number;
}
export = TsReader;
