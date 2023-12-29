/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorEmergencyInformation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorEmergencyInformation;
