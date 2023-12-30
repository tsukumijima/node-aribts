/// <reference types="node" />
import { Buffer } from "buffer";
interface Flag {
    flag: Buffer;
    ignore: Buffer;
    version_number: number;
}
interface Flags {
    flags: Flag[];
    last_flags_id: number;
}
interface Event {
    pf: {
        present: {
            [key: string]: any;
        };
        following: {
            [key: string]: any;
        };
    };
    schedule: {
        [key: string]: any;
    };
    basic_flags: Flags;
    extended_flags: Flags;
}
declare class TsEpg {
    epg: Map<number, Map<number, Map<number, Event>>>;
    constructor();
    needUpdate(current: {
        [key: string]: any;
    }, next: {
        [key: string]: any;
    }): boolean;
    addEit(pid: number, objEit: {
        [key: string]: any;
    }, time: Date): boolean;
    hasPresent(onid: number, tsid: number, sid: number): boolean;
    hasFollowing(onid: number, tsid: number, sid: number): boolean;
    hasSchedule(): boolean;
    getPresent(onid: number, tsid: number, sid: number): {
        [key: string]: any;
    };
    getFollowing(onid: number, tsid: number, sid: number): {
        [key: string]: any;
    };
    getSchedule(): {
        [key: string]: any;
    };
    getScheduleAmount(): [number, number];
}
export default TsEpg;
