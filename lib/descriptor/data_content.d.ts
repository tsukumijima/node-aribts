/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorDataContent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorDataContent;
