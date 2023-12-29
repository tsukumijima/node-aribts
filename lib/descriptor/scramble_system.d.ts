/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorScrambleSystem {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorScrambleSystem;
