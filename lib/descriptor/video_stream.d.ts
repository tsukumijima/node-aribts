/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorVideoStream {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorVideoStream;
