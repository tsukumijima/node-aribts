/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorExtendedBroadcaster {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorExtendedBroadcaster;
