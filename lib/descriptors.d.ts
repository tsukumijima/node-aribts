/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptors {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): any[];
}
export default TsDescriptors;
