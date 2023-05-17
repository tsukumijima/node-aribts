"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsBuffer = void 0;
class TsBuffer {
    constructor() {
        this.chunks = [];
        this.length = 0;
    }
    add(chunk) {
        this.chunks.push(chunk);
        this.length += chunk.length;
    }
    reset() {
        this.chunks.length = 0;
        this.length = 0;
    }
    concat() {
        return Buffer.concat(this.chunks);
    }
}
exports.TsBuffer = TsBuffer;
//# sourceMappingURL=buffer.js.map