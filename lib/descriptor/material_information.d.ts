/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorMaterialInformation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorMaterialInformation;
