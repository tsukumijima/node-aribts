/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorStreamIdentifier {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorStreamIdentifier;
