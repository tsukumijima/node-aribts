import { Buffer } from "buffer";
import { EventEmitter } from "events";
import { TsInfo } from "./info";
declare class TsStreamLite extends EventEmitter {
    info: {
        [pid: number]: TsInfo;
    };
    constructor();
    write(packets: Buffer[]): void;
    end(): void;
}
export default TsStreamLite;
