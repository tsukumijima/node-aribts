/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCompatibility {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCompatibility;
