/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCaService {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCaService;
