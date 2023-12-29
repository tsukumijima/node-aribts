"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TsDate {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        const [year, month, day] = this.decodeDate();
        const [hour, minute, second] = this.decodeTime();
        const date = new Date(year, month - 1, day, hour, minute, second);
        const time = date.getTime();
        const tz = date.getTimezoneOffset() * 60 * 1000;
        const jst = 9 * 60 * 60 * 1000;
        return new Date(time - tz - jst);
    }
    decodeDate() {
        const buffer = this.buffer.length === 2 ? this.buffer : this.buffer.slice(0, 2);
        const mjd = (buffer[0] << 8) | buffer[1];
        let year = (((mjd - 15078.2) / 365.25) | 0);
        let month = (((mjd - 14956.1 - ((year * 365.25) | 0)) / 30.6001) | 0);
        const day = mjd - 14956 - ((year * 365.25) | 0) - ((month * 30.6001) | 0);
        const k = (month === 14 || month === 15) ? 1 : 0;
        year = year + k + 1900;
        month = month - 1 - k * 12;
        return [year, month, day];
    }
    decodeTime() {
        const buffer = this.buffer.length === 3 ? this.buffer : this.buffer.slice(2);
        const hour = (buffer[0] >> 4) * 10 + (buffer[0] & 0x0F);
        const minite = (buffer[1] >> 4) * 10 + (buffer[1] & 0x0F);
        const second = (buffer[2] >> 4) * 10 + (buffer[2] & 0x0F);
        return [hour, minite, second];
    }
    decodeOffset() {
        const hour = (this.buffer[0] >> 4) * 10 + (this.buffer[0] & 0x0F);
        const minite = (this.buffer[1] >> 4) * 10 + (this.buffer[1] & 0x0F);
        return [hour, minite];
    }
}
exports.default = TsDate;
//# sourceMappingURL=date.js.map