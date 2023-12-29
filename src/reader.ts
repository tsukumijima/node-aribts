import { Buffer } from "buffer";

class TsReader {
    constructor(public buffer: Buffer, public position = 0) {
    }

    readBitsRaw(length: number) {
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

    readBits(length: number) {
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

    readBytesRaw(length: number): Buffer {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return Buffer.allocUnsafe(0);
        }

        const start = this.position >> 3;

        this.position += length << 3;

        return this.buffer.slice(start, start + length);
    }

    readBytes(length: number) {
        // return Buffer.from(this.readBytesRaw(length));
        // testing
        return this.readBytesRaw(length);
    }

    next(length: number) {
        this.position += length;
    }

    previous(length: number) {
        this.position -= length;
    }

    bslbf(length: number) {
        return this.readBits(length);
    }

    uimsbf(length: number) {
        return this.readBits(length);
    }

    tcimsbf(length: number) {
        return (-this.readBits(1) << length - 1) | this.readBits(length - 1);
    }

    rpchof(length: number) {
        return this.readBits(length);
    }
}

export = TsReader;
