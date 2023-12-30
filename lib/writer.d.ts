/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsWriter {
    buffer: Buffer;
    position: number;
    constructor(buffer: Buffer, position?: number);
    writeBits(length: number, value: number): void;
    writeBytes(length: number, value: Buffer): void;
    next(length: number): void;
    previous(length: number): void;
    bslbf(length: number, value: number): void;
    uimsbf(length: number, value: number): void;
    tcimsbf(length: number, value: number): void;
    rpchof(length: number, value: number): void;
}
export default TsWriter;
