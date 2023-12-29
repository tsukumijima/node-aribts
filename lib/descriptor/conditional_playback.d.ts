/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorConditionalPlayback {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorConditionalPlayback;
