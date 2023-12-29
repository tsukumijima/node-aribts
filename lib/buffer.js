"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsBuffer = void 0;
const buffer_1 = require("buffer");
class TsBuffer {
    chunks = [];
    length = 0;
    entireLength;
    add(chunk) {
        this.chunks.push(chunk);
        this.length += chunk.length;
    }
    reset() {
        this.chunks.length = 0;
        this.length = 0;
    }
    concat() {
        return buffer_1.Buffer.concat(this.chunks);
    }
}
exports.TsBuffer = TsBuffer;
//# sourceMappingURL=buffer.js.map