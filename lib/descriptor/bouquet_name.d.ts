/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorBouquetName {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorBouquetName;
