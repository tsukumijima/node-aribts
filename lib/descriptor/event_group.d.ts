/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorEventGroup {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorEventGroup;
