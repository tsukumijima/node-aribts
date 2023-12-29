/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsModuleDescriptors {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): any[];
}
export default TsModuleDescriptors;
