import { Buffer } from "buffer";

class TsWriter {
    constructor(public buffer: Buffer, public position: number = 0) {
    }

    writeBits(length: number, value: number) {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return;
        }

        while (length > 0) {
            let index: number = this.position >> 3;
            let shift: number = this.position & 0x07 ^ 0x07;

            this.buffer[index] = (this.buffer[index] & ~(1 << shift)) | ((value >> (length - 1) & 0x01) << shift);

            this.position++;
            length--;
        }
    }

    writeBytes(length: number, value: Buffer) {
        if (this.position + length > this.buffer.length << 3) {
            this.position += length;
            return;
        }

        let start: number = this.position >> 3;

        this.position += length << 3;

        value.copy(this.buffer, start, 0, length);
    }

    next(length: number) {
        this.position += length;
    }

    previous(length: number) {
        this.position -= length;
    }

    bslbf(length: number, value: number) {
        this.writeBits(length, value);
    }

    uimsbf(length: number, value: number) {
        this.writeBits(length, value);
    }

    tcimsbf(length: number, value: number) {
        this.writeBits(length, value >>> 31 << length - 1 | value & (1 << length - 1) - 1);
    }

    rpchof(length: number, value: number) {
        this.writeBits(length, value);
    }
}

export default TsWriter;
