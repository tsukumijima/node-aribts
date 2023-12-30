import TsEpg from "./epg";
declare class TsUtil {
    download_data_ids: Map<number, {
        [key: string]: any;
    }>;
    download_ids: Map<number, {
        [key: string]: any;
    }>;
    epg: TsEpg;
    logo_id_refs: Map<number, Map<number, Map<number, {
        [key: string]: any;
    }>>>;
    logo_ids: Map<number, Map<number, {
        [key: string]: any;
    }>>;
    original_network_id: number;
    service_ids: {
        [key: string]: any;
    };
    services: Map<number, Map<number, {
        [key: string]: any;
    }>>;
    time: Date;
    transport_stream_id: number;
    transport_streams: Map<number, {
        [key: string]: any;
    }>;
    versions: {
        pat: Map<any, any>;
        cat: Map<any, any>;
        pmt: Map<any, any>;
        dsmcc: Map<any, any>;
        nit: Map<any, any>;
        sdt: Map<any, any>;
        bat: Map<any, any>;
        sdtt: Map<any, any>;
        cdt: Map<any, any>;
    };
    constructor();
    reset(): void;
    addPat(pid: number, objPat: {
        [key: string]: any;
    }): boolean;
    addCat(pid: number, objCat: {
        [key: string]: any;
    }): boolean;
    addPmt(pid: number, objPmt: {
        [key: string]: any;
    }): boolean;
    addDsmcc(pid: number, objDsmcc: {
        [key: string]: any;
    }): boolean;
    addNit(pid: number, objNit: {
        [key: string]: any;
    }): boolean;
    addSdt(pid: number, objSdt: {
        [key: string]: any;
    }): boolean;
    addBat(pid: number, objBat: {
        [key: string]: any;
    }): boolean;
    addEit(pid: number, objEit: {
        [key: string]: any;
    }): boolean;
    addTdt(pid: number, objTdt: {
        [key: string]: any;
    }): boolean;
    addTot(pid: number, objTot: {
        [key: string]: any;
    }): boolean;
    addSdtt(pid: number, objSdtt: any): boolean;
    addCdt(pid: number, objCdt: {
        [key: string]: any;
    }): boolean;
    hasTransportStreams(onid: number): boolean;
    hasServices(onid: number, tsid: number): boolean;
    hasOriginalNetworkId(): boolean;
    hasTransportStreamId(): boolean;
    hasServiceIds(): boolean;
    hasPresent(onid: number, tsid: number, sid: number): boolean;
    hasFollowing(onid: number, tsid: number, sid: number): boolean;
    hasSchedule(): boolean;
    hasTime(): boolean;
    hasLogoId(onid: number, tsid: number, sid: number): boolean;
    hasLogo(logo_id: number, onid: number): boolean;
    getTransportStreams(onid: number): {
        [key: string]: any;
    };
    getServices(onid: number, tsid: number): {
        [key: string]: any;
    };
    getOriginalNetworkId(): number;
    getTransportStreamId(): number;
    getServiceIds(): number[];
    getPresent(onid: number, tsid: number, sid: number): {
        [key: string]: any;
    };
    getFollowing(onid: number, tsid: number, sid: number): {
        [key: string]: any;
    };
    getSchedule(): {
        [key: string]: any;
    };
    getScheduleAmount(): number[];
    getTime(): Date;
    getLogoId(onid: number, tsid: number, sid: number): number;
    getLogo(logo_id: number, onid: number): {
        [key: string]: any;
    };
}
export default TsUtil;
