/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableDit {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableDit;
