/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorExtendedEvent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorExtendedEvent;
