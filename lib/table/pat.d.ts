/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTablePat {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
    encode(objPat: any): Buffer;
}
export default TsTablePat;
