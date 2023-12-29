/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorServiceGroup {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorServiceGroup;
