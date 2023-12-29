/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorNetworkDownloadContent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorNetworkDownloadContent;
