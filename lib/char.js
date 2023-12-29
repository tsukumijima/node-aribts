"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const iconv_lite_1 = require("iconv-lite");
const char_table_1 = require("./char_table");
const charCode = {
    hiragana: 0x30,
    katakana: 0x31,
    mosaic_a: 0x32,
    mosaic_b: 0x33,
    mosaic_c: 0x34,
    mosaic_d: 0x35,
    prop_ascii: 0x36,
    prop_hiragana: 0x37,
    prop_katakana: 0x38,
    jis_kanji_1: 0x39,
    jis_kanji_2: 0x3A,
    symbol: 0x3B,
    kanji: 0x42,
    ascii: 0x4A,
    jis_x0201_katakana: 0x49
};
const charMode = {
    graphic: 1,
    drcs: 2,
    other: 3
};
class TsChar {
    buffer;
    position = 0;
    graphic = [charCode.kanji, charCode.ascii, charCode.hiragana, charCode.katakana];
    graphicMode = [charMode.graphic, charMode.graphic, charMode.graphic, charMode.graphic];
    graphicByte = [2, 1, 1, 1];
    graphicL = 0;
    graphicR = 2;
    graphicNormal = true;
    sjis = [];
    result = "";
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        try {
            while (this.position < this.buffer.length) {
                const byte = this.buffer[this.position];
                if (byte <= 0x20) {
                    this.readC0();
                }
                else if (byte <= 0x7E) {
                    this.readGL();
                }
                else if (byte <= 0xA0) {
                    this.readC1();
                }
                else if (byte !== 0xFF) {
                    this.readGR();
                }
                else {
                    this.position++;
                }
            }
        }
        catch (err) {
        }
        if (this.sjis.length > 0) {
            this.result += (0, iconv_lite_1.decode)(buffer_1.Buffer.from(this.sjis), "shift-jis");
            this.sjis = [];
        }
        return this.result;
    }
    readC0() {
        switch (this.getNext()) {
            case 0x20:
                if (this.graphicNormal) {
                    this.sjis.push(0x81, 0x40);
                }
                else {
                    this.sjis.push(0x20);
                }
                break;
            case 0x0D:
                this.sjis.push(0x0D, 0x0A);
                break;
            case 0x0E:
                this.graphicL = 1;
                break;
            case 0x0F:
                this.graphicL = 0;
                break;
            case 0x19:
                this.readSS2();
                break;
            case 0x1D:
                this.readSS3();
                break;
            case 0x1B:
                this.readESC();
                break;
            case 0x16:
                this.position += 1;
                break;
            case 0x1C:
                this.position += 2;
                break;
        }
    }
    readC1() {
        switch (this.getNext()) {
            case 0x89:
                this.graphicNormal = false;
                break;
            case 0x8A:
                this.graphicNormal = true;
                break;
            case 0x88:
                this.graphicNormal = false;
                break;
            case 0x8B:
                this.graphicNormal = this.getNext() !== 0x60;
                break;
            case 0x90:
                if (this.getNext() === 0x20) {
                    this.position += 1;
                }
                break;
            case 0x91:
                this.position += 1;
                break;
            case 0x93:
                this.position += 1;
                break;
            case 0x94:
                this.position += 1;
                break;
            case 0x95:
                while (this.position < this.buffer.length && this.buffer[this.position] !== 0x4F) {
                    this.position++;
                }
                break;
            case 0x97:
                this.position += 1;
                break;
            case 0x98:
                this.position += 1;
                break;
            case 0x9D:
                if (this.getNext() === 0x20) {
                    this.position += 1;
                }
                else {
                    while (this.position < this.buffer.length && this.buffer[this.position] < 0x40 && this.buffer[this.position] > 0x43) {
                        this.position++;
                    }
                }
                break;
            case 0x9B:
                this.readCSI();
                break;
        }
    }
    readGL() {
        switch (this.graphicMode[this.graphicL]) {
            case charMode.graphic:
                switch (this.graphic[this.graphicL]) {
                    case charCode.prop_ascii:
                    case charCode.ascii:
                    case charCode.jis_x0201_katakana:
                        if (this.graphicNormal) {
                            this.sjis.push(...char_table_1.default.ascii[this.getNext()]);
                        }
                        else {
                            this.sjis.push(this.getNext());
                        }
                        break;
                    case charCode.hiragana:
                    case charCode.prop_hiragana:
                        this.sjis.push(...char_table_1.default.hiragana[this.getNext()]);
                        break;
                    case charCode.katakana:
                    case charCode.prop_katakana:
                        this.sjis.push(...char_table_1.default.katakana[this.getNext()]);
                        break;
                    case charCode.jis_kanji_1:
                    case charCode.jis_kanji_2:
                    case charCode.symbol:
                    case charCode.kanji:
                        const first = this.getNext();
                        const second = this.getNext();
                        if (this.useUnicode(first, second)) {
                            if (this.sjis.length > 0) {
                                this.result += (0, iconv_lite_1.decode)(buffer_1.Buffer.from(this.sjis), "shift-jis");
                                this.sjis = [];
                            }
                            this.result += this.getUnicode(first, second);
                        }
                        else {
                            this.sjis.push(...this.getSjis(first, second));
                        }
                        break;
                }
                break;
            default:
                this.position += this.graphicByte[this.graphicL];
        }
    }
    readGR() {
        switch (this.graphicMode[this.graphicR]) {
            case charMode.graphic:
                switch (this.graphic[this.graphicR]) {
                    case charCode.prop_ascii:
                    case charCode.ascii:
                        if (this.graphicNormal) {
                            this.sjis.push(...char_table_1.default.ascii[(this.getNext() & 0x7F)]);
                        }
                        else {
                            this.sjis.push((this.getNext() & 0x7F));
                        }
                        break;
                    case charCode.hiragana:
                    case charCode.prop_hiragana:
                        this.sjis.push(...char_table_1.default.hiragana[(this.getNext() & 0x7F)]);
                        break;
                    case charCode.katakana:
                    case charCode.prop_katakana:
                    case charCode.jis_x0201_katakana:
                        this.sjis.push(...char_table_1.default.katakana[(this.getNext() & 0x7F)]);
                        break;
                    case charCode.jis_kanji_1:
                    case charCode.jis_kanji_2:
                    case charCode.symbol:
                    case charCode.kanji:
                        const first = this.getNext() & 0x7F;
                        const second = this.getNext() & 0x7F;
                        if (this.useUnicode(first, second)) {
                            if (this.sjis.length > 0) {
                                this.result += (0, iconv_lite_1.decode)(buffer_1.Buffer.from(this.sjis), "shift-jis");
                                this.sjis = [];
                            }
                            this.result += this.getUnicode(first, second);
                        }
                        else {
                            this.sjis.push(...this.getSjis(first, second));
                        }
                        break;
                }
                break;
            default:
                this.position += this.graphicByte[this.graphicR];
        }
    }
    readESC() {
        const byte = this.getNext();
        if (byte === 0x24) {
            const byte2 = this.getNext();
            if (byte2 >= 0x28 && byte2 <= 0x2B) {
                const byte3 = this.getNext();
                if (byte3 === 0x20) {
                    const byte4 = this.getNext();
                    this.graphic[byte2 - 0x28] = byte4;
                    this.graphicMode[byte2 - 0x28] = charMode.drcs;
                    this.graphicByte[byte2 - 0x28] = 2;
                }
                else if (byte3 === 0x28) {
                    const byte4 = this.getNext();
                    this.graphic[byte2 - 0x28] = byte4;
                    this.graphicMode[byte2 - 0x28] = charMode.other;
                    this.graphicByte[byte2 - 0x28] = 1;
                }
                else {
                    this.graphic[byte2 - 0x28] = byte3;
                    this.graphicMode[byte2 - 0x28] = charMode.graphic;
                    this.graphicByte[byte2 - 0x28] = 2;
                }
            }
            else {
                this.graphic[0] = byte2;
                this.graphicMode[0] = charMode.graphic;
                this.graphicByte[0] = 2;
            }
        }
        else if (byte >= 0x28 && byte <= 0x2B) {
            const byte2 = this.getNext();
            if (byte2 === 0x20) {
                const byte3 = this.getNext();
                this.graphic[byte - 0x28] = byte3;
                this.graphicMode[byte - 0x28] = charMode.drcs;
                this.graphicByte[byte - 0x28] = 1;
            }
            else {
                this.graphic[byte - 0x28] = byte2;
                this.graphicMode[byte - 0x28] = charMode.graphic;
                this.graphicByte[byte - 0x28] = 1;
            }
        }
        else if (byte === 0x6E) {
            this.graphicL = 2;
        }
        else if (byte === 0x6F) {
            this.graphicL = 3;
        }
        else if (byte === 0x7C) {
            this.graphicR = 3;
        }
        else if (byte === 0x7D) {
            this.graphicR = 2;
        }
        else if (byte === 0x7E) {
            this.graphicR = 1;
        }
    }
    readSS2() {
        const holdL = this.graphicL;
        this.graphicL = 2;
        this.readGL();
        this.graphicL = holdL;
    }
    readSS3() {
        const holdL = this.graphicL;
        this.graphicL = 3;
        this.readGL();
        this.graphicL = holdL;
    }
    readCSI() {
    }
    getNext() {
        if (this.buffer.length === this.position) {
            throw new Error("Buffer out of range");
        }
        return this.buffer[this.position++];
    }
    useUnicode(first, second) {
        if (first >= 0x75 && second >= 0x21) {
            const code = (first << 8) | second;
            if (code >= 0x7521 && code <= 0x764B) {
                return true;
            }
            else if (code >= 0x7A4D && code <= 0x7E7D) {
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    }
    getSjis(first, second) {
        if (first >= 0x75 && second >= 0x21) {
            const code = (first << 8) | second;
            if (code >= 0x7521 && code <= 0x764B) {
                return char_table_1.default.gaiji_2[code];
            }
            else if (code >= 0x7A4D && code <= 0x7E7D) {
                return char_table_1.default.gaiji_1[code];
            }
            return [];
        }
        const row = first < 0x5F ? 0x70 : 0xB0;
        const cell = first & 1 ? (second > 0x5F ? 0x20 : 0x1F) : 0x7E;
        first = (((first + 1) >> 1) + row) & 0xFF;
        second = (second + cell) & 0xFF;
        return [first, second];
    }
    getUnicode(first, second) {
        if (first >= 0x75 && second >= 0x21) {
            const code = (first << 8) | second;
            if (code >= 0x7521 && code <= 0x764B) {
                return char_table_1.default.gaiji_2_unicode[code];
            }
            else if (code >= 0x7A4D && code <= 0x7E7D) {
                return char_table_1.default.gaiji_1_unicode[code];
            }
            return "";
        }
        else {
            return "";
        }
    }
}
exports.default = TsChar;
//# sourceMappingURL=char.js.map