/// <reference types="node" />
declare class TsChar {
    buffer: Buffer;
    position: number;
    graphic: number[];
    graphicMode: number[];
    graphicByte: [number, number, number, number];
    graphicL: number;
    graphicR: number;
    graphicNormal: boolean;
    sjis: number[];
    result: string;
    constructor(buffer: Buffer);
    decode(): string;
    readC0(): void;
    readC1(): void;
    readGL(): void;
    readGR(): void;
    readESC(): void;
    readSS2(): void;
    readSS3(): void;
    readCSI(): void;
    getNext(): number;
    useUnicode(first: number, second: number): boolean;
    getSjis(first: number, second: number): number[];
    getUnicode(first: number, second: number): string;
}
export = TsChar;
