/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsTableSdtt {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsTableSdtt;
