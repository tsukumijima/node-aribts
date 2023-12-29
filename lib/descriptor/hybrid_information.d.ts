/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorHybridInformation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorHybridInformation;
