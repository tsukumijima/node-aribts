/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorDlProtection {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorDlProtection;
