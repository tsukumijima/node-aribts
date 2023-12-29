/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCaIdentifier {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCaIdentifier;
