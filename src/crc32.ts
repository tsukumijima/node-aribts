import { Buffer } from "buffer";
import { crc32Table, pngCrc32Table } from "./crc32_table";

export const calc = function (buffer: Buffer): number {
    let crc = -1;
    let i = 0;
    const len = buffer.length;
    while (i < len) {
        crc = (crc << 8) ^ crc32Table[(crc >>> 24) ^ buffer[i++]];
    }
    return crc;
}

export const pngCalc = function (buffer: Buffer): number {
    let crc = -1;
    let i = 0;
    const len = buffer.length;
    while (i < len) {
        crc = (crc >>> 8) ^ pngCrc32Table[(crc & 0xff) ^ buffer[i++]];
    }
    return ~crc;
}

export const calcToBuffer = function (buffer: Buffer): Buffer {
    let result = Buffer.alloc(4);
    result.writeInt32BE(calc(buffer), 0);
    return result;
}
