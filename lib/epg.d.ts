export = TsEpg;
declare class TsEpg {
    epg: Map<any, any>;
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
