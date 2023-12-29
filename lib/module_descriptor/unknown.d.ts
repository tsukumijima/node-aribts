/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptorUnknown {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsModuleDescriptorUnknown;
