/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorComponentGroup {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorComponentGroup;
