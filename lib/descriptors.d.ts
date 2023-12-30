/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptors {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    }[];
}
export default TsDescriptors;
