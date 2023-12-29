/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCountryAvailability {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCountryAvailability;
