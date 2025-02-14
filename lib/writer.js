"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TsWriter {
    buffer;
    position;
    constructor(buffer, position = 0) {
        this.buffer = buffer;
        this.position = position;
    }
    writeBits(length, value) {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return;
        }
        while (length > 0) {
            let index = this.position >> 3;
            let shift = this.position & 0x07 ^ 0x07;
            this.buffer[index] = (this.buffer[index] & ~(1 << shift)) | ((value >> (length - 1) & 0x01) << shift);
            this.position++;
            length--;
        }
    }
    writeBytes(length, value) {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return;
        }
        let start = this.position >> 3;
        this.position += length << 3;
        value.copy(this.buffer, start, 0, length);
    }
    next(length) {
        this.position += length;
    }
    previous(length) {
        this.position -= length;
    }
    bslbf(length, value) {
        this.writeBits(length, value);
    }
    uimsbf(length, value) {
        this.writeBits(length, value);
    }
    tcimsbf(length, value) {
        this.writeBits(length, value >>> 31 << length - 1 | value & (1 << length - 1) - 1);
    }
    rpchof(length, value) {
        this.writeBits(length, value);
    }
}
exports.default = TsWriter;
//# sourceMappingURL=writer.js.map