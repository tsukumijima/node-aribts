/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorStcReference {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorStcReference;
