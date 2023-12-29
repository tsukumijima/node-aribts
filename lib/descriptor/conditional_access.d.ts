/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorConditionalAccess {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorConditionalAccess;
