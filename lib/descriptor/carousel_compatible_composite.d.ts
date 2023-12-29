/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorCarouselCompatibleComposite {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorCarouselCompatibleComposite;
