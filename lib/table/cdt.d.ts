/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableCdt {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableCdt;
