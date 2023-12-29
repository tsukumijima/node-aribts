/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorTargetBackgroundGrid {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorTargetBackgroundGrid;
