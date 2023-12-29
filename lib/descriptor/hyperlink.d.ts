/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorHyperlink {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorHyperlink;
