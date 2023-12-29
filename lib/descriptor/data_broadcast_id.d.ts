/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorDataBroadcastId {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorDataBroadcastId;
