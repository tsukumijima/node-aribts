"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcToBuffer = exports.pngCalc = exports.calc = void 0;
const buffer_1 = require("buffer");
const crc32_table_1 = require("./crc32_table");
const calc = function (buffer) {
    let crc = -1;
    let i = 0;
    const len = buffer.length;
    while (i < len) {
        crc = (crc << 8) ^ crc32_table_1.crc32Table[(crc >>> 24) ^ buffer[i++]];
    }
    return crc;
};
exports.calc = calc;
const pngCalc = function (buffer) {
    let crc = -1;
    let i = 0;
    const len = buffer.length;
    while (i < len) {
        crc = (crc >>> 8) ^ crc32_table_1.pngCrc32Table[(crc & 0xff) ^ buffer[i++]];
    }
    return ~crc;
};
exports.pngCalc = pngCalc;
const calcToBuffer = function (buffer) {
    let result = buffer_1.Buffer.alloc(4);
    result.writeInt32BE((0, exports.calc)(buffer), 0);
    return result;
};
exports.calcToBuffer = calcToBuffer;
//# sourceMappingURL=crc32.js.map