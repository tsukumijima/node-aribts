/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDataModuleLogo {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDataModuleLogo;
