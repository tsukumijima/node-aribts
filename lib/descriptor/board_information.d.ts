/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorBoardInformation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorBoardInformation;
