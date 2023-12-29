/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorMultiplexBufferUtilization {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorMultiplexBufferUtilization;
