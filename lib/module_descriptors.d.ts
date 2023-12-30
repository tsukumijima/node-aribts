/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptors {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    }[];
}
export default TsModuleDescriptors;
