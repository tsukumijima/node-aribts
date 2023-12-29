/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorLocalTimeOffset {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorLocalTimeOffset;
