import { Buffer } from "buffer";
declare class TsDescriptorBroadcastId {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): {
        [key: string]: any;
    };
}
export default TsDescriptorBroadcastId;
