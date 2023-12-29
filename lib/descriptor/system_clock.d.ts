/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorSystemClock {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorSystemClock;
