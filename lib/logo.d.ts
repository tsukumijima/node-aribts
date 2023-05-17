/// <reference types="node" />
declare class TsLogo {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): Buffer;
    static decode(buffer: Buffer): Buffer;
}
export = TsLogo;
