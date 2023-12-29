/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptorName {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsModuleDescriptorName;
