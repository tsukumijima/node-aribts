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
    addPat(pid: any, objPat: any): boolean;
    addCat(pid: any, objCat: any): boolean;
    addPmt(pid: any, objPmt: any): boolean;
    addDsmcc(pid: any, objDsmcc: any): boolean;
    addNit(pid: any, objNit: any): boolean;
    addSdt(pid: any, objSdt: any): boolean;
    addBat(pid: any, objBat: any): boolean;
    addEit(pid: any, objEit: any): boolean;
    addTdt(pid: any, objTdt: any): boolean;
    addTot(pid: any, objTot: any): boolean;
    addSdtt(pid: any, objSdtt: any): boolean;
    addCdt(pid: any, objCdt: any): boolean;
    hasTransportStreams(onid: any): boolean;
    hasServices(onid: any, tsid: any): boolean;
    hasOriginalNetworkId(): boolean;
    hasTransportStreamId(): boolean;
    hasServiceIds(): boolean;
    hasPresent(onid: any, tsid: any, sid: any): boolean;
    hasFollowing(onid: any, tsid: any, sid: any): boolean;
    hasSchedule(): boolean;
    hasTime(): boolean;
    hasLogoId(onid: any, tsid: any, sid: any): any;
    hasLogo(logo_id: any, onid: any): boolean;
    getTransportStreams(onid: any): {};
    getServices(onid: any, tsid: any): {};
    getOriginalNetworkId(): number;
    getTransportStreamId(): number;
    getServiceIds(): unknown[];
    getPresent(onid: any, tsid: any, sid: any): any;
    getFollowing(onid: any, tsid: any, sid: any): any;
    getSchedule(): {};
    getScheduleAmount(): number[];
    getTime(): Date;
    getLogoId(onid: any, tsid: any, sid: any): any;
    getLogo(logo_id: any, onid: any): {};
}
export default TsUtil;
