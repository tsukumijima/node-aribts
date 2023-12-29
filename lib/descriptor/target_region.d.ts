/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorTargetRegion {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorTargetRegion;
