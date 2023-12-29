/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorNodeRelation {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorNodeRelation;
