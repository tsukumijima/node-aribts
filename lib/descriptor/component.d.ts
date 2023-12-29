/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorComponent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorComponent;
