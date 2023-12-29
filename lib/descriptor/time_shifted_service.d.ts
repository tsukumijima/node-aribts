/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorTimeShiftedService {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorTimeShiftedService;
