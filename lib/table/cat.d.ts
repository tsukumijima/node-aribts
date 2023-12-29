/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableCat {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableCat;
