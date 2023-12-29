/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorVideoDecodeControl {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorVideoDecodeControl;
