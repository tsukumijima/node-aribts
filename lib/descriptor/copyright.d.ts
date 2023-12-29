/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCopyright {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCopyright;
