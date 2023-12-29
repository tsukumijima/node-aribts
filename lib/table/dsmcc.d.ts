/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableDsmcc {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableDsmcc;
