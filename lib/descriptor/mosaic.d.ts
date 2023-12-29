/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorMosaic {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorMosaic;
