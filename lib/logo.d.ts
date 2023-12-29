/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsLogo {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): Buffer;
    static decode(buffer: Buffer): Buffer;
}
export default TsLogo;
