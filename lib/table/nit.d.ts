/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableNit {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableNit;
