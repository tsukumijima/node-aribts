import { Buffer } from "buffer";
declare class TsLogo {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): Buffer<ArrayBufferLike>;
    static decode(buffer: Buffer): Buffer;
}
export default TsLogo;
