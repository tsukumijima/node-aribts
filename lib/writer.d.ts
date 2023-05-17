export = TsWriter;
declare class TsWriter {
    constructor(buffer: any, position: any);
    buffer: any;
    position: any;
    writeBits(length: any, value: any): void;
    writeBytes(length: any, value: any): void;
    next(length: any): void;
    previous(length: any): void;
    bslbf(length: any, value: any): void;
    uimsbf(length: any, value: any): void;
    tcimsbf(length: any, value: any): void;
    rpchof(length: any, value: any): void;
}
