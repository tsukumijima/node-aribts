/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorNetworkIdentification {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorNetworkIdentification;
