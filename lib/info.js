"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsInfo = void 0;
const buffer_1 = require("./buffer");
class TsInfo {
    constructor() {
        this.name = "";
        this.packet = 0;
        this.counter = -1;
        this.duplication = 0;
        this.type = 0;
        this.drop = 0;
        this.scrambling = 0;
        this.buffer = new buffer_1.TsBuffer();
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