"use strict";
const crc32 = require("./crc32");
const logoClut = require("./logo_clut");
const PLTE_BUF = Buffer.allocUnsafe(4 + 4 + logoClut.length * 3 + 4);
const TRNS_BUF = Buffer.allocUnsafe(4 + 4 + logoClut.length + 4);
{
    let bytesWritten = 0;
    PLTE_BUF.writeUInt32BE(logoClut.length * 3, bytesWritten);
    bytesWritten += 4;
    Buffer.from("PLTE").copy(PLTE_BUF, bytesWritten);
    bytesWritten += 4;
    for (const palette of logoClut) {
        PLTE_BUF.writeUInt8(palette[0], bytesWritten++);
        PLTE_BUF.writeUInt8(palette[1], bytesWritten++);
        PLTE_BUF.writeUInt8(palette[2], bytesWritten++);
    }
    PLTE_BUF.writeInt32BE(crc32.pngCalc(PLTE_BUF.slice(4, bytesWritten)), bytesWritten);
}
{
    let bytesWritten = 0;
    TRNS_BUF.writeUInt32BE(logoClut.length, bytesWritten);
    bytesWritten += 4;
    Buffer.from("tRNS").copy(TRNS_BUF, bytesWritten);
    bytesWritten += 4;
    for (const palette of logoClut) {
        TRNS_BUF.writeUInt8(palette[3], bytesWritten++);
    }
    TRNS_BUF.writeInt32BE(crc32.pngCalc(TRNS_BUF.slice(4, bytesWritten)), bytesWritten);
}
class TsLogo {
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        return TsLogo.decode(this.buffer);
    }
    static decode(buffer) {
        const pngBufferList = [buffer.slice(0, 33), PLTE_BUF, TRNS_BUF, buffer.slice(33)];
        const pngBufferLength = buffer.length + PLTE_BUF.length + TRNS_BUF.length;
        return Buffer.concat(pngBufferList, pngBufferLength);
    }
}
module.exports = TsLogo;
//# sourceMappingURL=logo.js.map