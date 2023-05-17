"use strict";
class TsReader {
    constructor(buffer, position = 0) {
        this.buffer = buffer;
        this.position = position;
    }
    readBitsRaw(length) {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return 0;
        }
        let value = 0;
        while (length > 7) {
            const index = this.position >> 3;
            const shift = this.position & 0x07;
            const mask = Math.pow(2, 8 - shift) - 1;
            value <<= 8;
            value |= (this.buffer[index] & mask) << shift;
            value |= this.buffer[index + 1] >> (8 - shift);
            this.position += 8;
            length -= 8;
        }
        while (length > 0) {
            const index = this.position >> 3;
            const shift = this.position & 0x07 ^ 0x07;
            value <<= 1;
            value |= this.buffer[index] >> shift & 0x01;
            this.position++;
            length--;
        }
        return value;
    }
    readBits(length) {
        let value = 0;
        while (length > 31) {
            const bits = (length - 1) % 31 + 1;
            value += this.readBitsRaw(bits);
            value *= 0x80000000;
            length -= bits;
        }
        value += this.readBitsRaw(length);
        return value;
    }
    readBytesRaw(length) {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return Buffer.allocUnsafe(0);
        }
        const start = this.position >> 3;
        this.position += length << 3;
        return this.buffer.slice(start, start + length);
    }
    readBytes(length) {
        return this.readBytesRaw(length);
    }
    next(length) {
        this.position += length;
    }
    previous(length) {
        this.position -= length;
    }
    bslbf(length) {
        return this.readBits(length);
    }
    uimsbf(length) {
        return this.readBits(length);
    }
    tcimsbf(length) {
        return (-this.readBits(1) << length - 1) | this.readBits(length - 1);
    }
    rpchof(length) {
        return this.readBits(length);
    }
}
module.exports = TsReader;
//# sourceMappingURL=reader.js.map