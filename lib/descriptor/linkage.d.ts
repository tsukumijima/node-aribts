/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorLinkage {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorLinkage;
