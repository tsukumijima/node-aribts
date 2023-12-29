/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDataModuleCommonTable {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDataModuleCommonTable;
