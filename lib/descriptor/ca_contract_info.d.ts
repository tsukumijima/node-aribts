/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCaContractInfo {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCaContractInfo;
