/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorStd {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorStd;
