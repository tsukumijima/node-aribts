/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorShortEvent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorShortEvent;
