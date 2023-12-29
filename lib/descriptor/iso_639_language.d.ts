/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorIso639Language {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorIso639Language;
