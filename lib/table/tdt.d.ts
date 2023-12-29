/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableTdt {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableTdt;
