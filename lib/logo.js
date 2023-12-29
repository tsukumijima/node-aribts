"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const crc32 = require("./crc32");
const logo_clut_1 = require("./logo_clut");
const PLTE_BUF = buffer_1.Buffer.allocUnsafe(4 + 4 + logo_clut_1.default.length * 3 + 4);
const TRNS_BUF = buffer_1.Buffer.allocUnsafe(4 + 4 + logo_clut_1.default.length + 4);
{
    let bytesWritten = 0;
    PLTE_BUF.writeUInt32BE(logo_clut_1.default.length * 3, bytesWritten);
    bytesWritten += 4;
    buffer_1.Buffer.from("PLTE").copy(PLTE_BUF, bytesWritten);
    bytesWritten += 4;
    for (const palette of logo_clut_1.default) {
        PLTE_BUF.writeUInt8(palette[0], bytesWritten++);
        PLTE_BUF.writeUInt8(palette[1], bytesWritten++);
        PLTE_BUF.writeUInt8(palette[2], bytesWritten++);
    }
    PLTE_BUF.writeInt32BE(crc32.pngCalc(PLTE_BUF.slice(4, bytesWritten)), bytesWritten);
}
{
    let bytesWritten = 0;
    TRNS_BUF.writeUInt32BE(logo_clut_1.default.length, bytesWritten);
    bytesWritten += 4;
    buffer_1.Buffer.from("tRNS").copy(TRNS_BUF, bytesWritten);
    bytesWritten += 4;
    for (const palette of logo_clut_1.default) {
        TRNS_BUF.writeUInt8(palette[3], bytesWritten++);
    }
    TRNS_BUF.writeInt32BE(crc32.pngCalc(TRNS_BUF.slice(4, bytesWritten)), bytesWritten);
}
class TsLogo {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        return TsLogo.decode(this.buffer);
    }
    static decode(buffer) {
        const pngBufferList = [buffer.slice(0, 33), PLTE_BUF, TRNS_BUF, buffer.slice(33)];
        const pngBufferLength = buffer.length + PLTE_BUF.length + TRNS_BUF.length;
        return buffer_1.Buffer.concat(pngBufferList, pngBufferLength);
    }
}
exports.default = TsLogo;
//# sourceMappingURL=logo.js.map