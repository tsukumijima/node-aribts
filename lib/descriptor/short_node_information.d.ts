/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorShortNodeInformation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorShortNodeInformation;
