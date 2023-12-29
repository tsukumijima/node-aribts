/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorAudioComponent {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorAudioComponent;
