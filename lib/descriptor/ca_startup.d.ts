/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCaStartup {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCaStartup;
