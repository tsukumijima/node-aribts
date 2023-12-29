/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsDescriptorSatelliteDeliverySystem {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorSatelliteDeliverySystem;
