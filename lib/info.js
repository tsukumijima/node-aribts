"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsInfo = void 0;
const buffer_1 = require("./buffer");
class TsInfo {
    name = "";
    packet = 0;
    counter = -1;
    duplication = 0;
    type = 0;
    drop = 0;
    scrambling = 0;
    buffer = new buffer_1.TsBuffer();
    constructor() {
        this.buffer.entireLength = 0;
    }
    toObject() {
        return {
            packet: this.packet,
            drop: this.drop,
            scrambling: this.scrambling
        };
    }
}
exports.TsInfo = TsInfo;
//# sourceMappingURL=info.js.map