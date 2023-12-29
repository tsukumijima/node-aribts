/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorContent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorContent;
