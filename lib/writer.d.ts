/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsWriter {
    buffer: Buffer;
    position: number;
    constructor(buffer: Buffer, position?: number);
    writeBits(length: any, value: any): void;
    writeBytes(length: any, value: any): void;
    next(length: any): void;
    previous(length: any): void;
    bslbf(length: any, value: any): void;
    uimsbf(length: any, value: any): void;
    tcimsbf(length: any, value: any): void;
    rpchof(length: any, value: any): void;
}
export default TsWriter;
