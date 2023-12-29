/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorReference {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorReference;
