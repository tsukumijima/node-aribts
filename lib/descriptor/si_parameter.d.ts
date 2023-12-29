/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorSiParameter {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorSiParameter;
