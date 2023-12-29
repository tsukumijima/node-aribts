/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorBasicLocalEvent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorBasicLocalEvent;
