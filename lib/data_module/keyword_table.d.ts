/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDataModuleKeywordTable {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDataModuleKeywordTable;
