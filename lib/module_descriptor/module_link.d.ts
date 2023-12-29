/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptorModuleLink {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsModuleDescriptorModuleLink;
