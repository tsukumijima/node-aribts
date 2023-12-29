/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableSit {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableSit;
