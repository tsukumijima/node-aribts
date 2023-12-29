/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorAudioStream {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorAudioStream;
