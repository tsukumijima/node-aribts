/// <reference types="node" />
import { Buffer } from "buffer";
declare class TsEpg {
    epg: Map<number, Map<number, Map<number, {
        pf: {
            present: any;
            following: any;
        };
        schedule: any;
        basic_flags: {
            flags: {
                flag: Buffer;
                ignore: Buffer;
                version_number: number;
            }[];
            last_flags_id: number;
        };
        extended_flags: {
            flags: {
                flag: Buffer;
                ignore: Buffer;
                version_number: number;
            }[];
            last_flags_id: number;
        };
    }>>>;
    constructor();
    needUpdate(current: any, next: any): boolean;
    addEit(pid: any, objEit: any, time: any): boolean;
    hasPresent(onid: any, tsid: any, sid: any): boolean;
    hasFollowing(onid: any, tsid: any, sid: any): boolean;
    hasSchedule(): boolean;
    getPresent(onid: any, tsid: any, sid: any): any;
    getFollowing(onid: any, tsid: any, sid: any): any;
    getSchedule(): {};
    getScheduleAmount(): number[];
}
export default TsEpg;
