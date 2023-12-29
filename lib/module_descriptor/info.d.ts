/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptorInfo {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsModuleDescriptorInfo;
