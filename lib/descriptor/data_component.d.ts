/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorDataComponent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorDataComponent;
