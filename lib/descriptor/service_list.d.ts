/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorServiceList {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorServiceList;
