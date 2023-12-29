/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorService {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorService;
