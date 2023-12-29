/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorConnectedTransmission {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorConnectedTransmission;
