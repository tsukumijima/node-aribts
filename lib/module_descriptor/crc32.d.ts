/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptorCrc32 {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsModuleDescriptorCrc32;
