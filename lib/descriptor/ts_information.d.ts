/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorTsInformation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorTsInformation;
