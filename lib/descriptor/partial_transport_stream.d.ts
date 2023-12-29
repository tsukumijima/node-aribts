/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorPartialTransportStream {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorPartialTransportStream;
