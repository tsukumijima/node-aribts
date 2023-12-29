/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorPartialTransportStreamTime {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorPartialTransportStreamTime;
