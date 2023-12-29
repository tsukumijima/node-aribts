/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorRegistration {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorRegistration;
