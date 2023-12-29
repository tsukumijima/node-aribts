/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorAccessControl {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorAccessControl;
