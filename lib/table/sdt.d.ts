/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableSdt {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableSdt;
