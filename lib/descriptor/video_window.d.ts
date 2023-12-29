/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorVideoWindow {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorVideoWindow;
