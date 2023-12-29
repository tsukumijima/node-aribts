/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorContentAvailability {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorContentAvailability;
