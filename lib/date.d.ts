/// <reference types="node" />
type Year = number;
type Month = number;
type Day = number;
type Hour = number;
type Minute = number;
type Second = number;
declare class TsDate {
    buffer: Buffer;
    constructor(buffer: Buffer);
    decode(): Date;
    decodeDate(): [Year, Month, Day];
    decodeTime(): [Hour, Minute, Second];
    decodeOffset(): [Hour, Minute];
}
export = TsDate;
