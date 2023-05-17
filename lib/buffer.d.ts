/// <reference types="node" />
export declare class TsBuffer {
    chunks: Buffer[];
    length: number;
    entireLength: number;
    add(chunk: Buffer): void;
    reset(): void;
    concat(): Buffer;
}
