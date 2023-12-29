/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorLdtLinkage {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorLdtLinkage;
