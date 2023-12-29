/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorTimeShiftedEvent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorTimeShiftedEvent;
