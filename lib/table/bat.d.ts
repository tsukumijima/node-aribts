/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableBat {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableBat;
