/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorStuffing {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorStuffing;
