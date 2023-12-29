/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorDownloadContent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorDownloadContent;
