import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptorCompatibility from "../descriptor/compatibility";
import TsModuleDescriptors from "../module_descriptors";

class TsDsmccMessageDownloadInfoIndication {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDii = {};

        // @ts-expect-error TS(2339): Property 'protocolDiscriminator' does not exist on... Remove this comment to see the full error message
        objDii.protocolDiscriminator = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'dsmccType' does not exist on type '{}'.
        objDii.dsmccType = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'messageId' does not exist on type '{}'.
        objDii.messageId = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'transaction_id' does not exist on type '... Remove this comment to see the full error message
        objDii.transaction_id = reader.uimsbf(32);
        reader.next(8);    // reserved
        // @ts-expect-error TS(2339): Property 'adaptationLength' does not exist on type... Remove this comment to see the full error message
        objDii.adaptationLength = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'messageLength' does not exist on type '{... Remove this comment to see the full error message
        objDii.messageLength = reader.uimsbf(16);

        // @ts-expect-error TS(2339): Property 'adaptationLength' does not exist on type... Remove this comment to see the full error message
        if (objDii.adaptationLength > 0) {
            // @ts-expect-error TS(2339): Property 'adaptationType' does not exist on type '... Remove this comment to see the full error message
            objDii.adaptationType = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'adaptationDataByte' does not exist on ty... Remove this comment to see the full error message
            objDii.adaptationDataByte = reader.readBytes(objDii.adaptationLength - 1);
        }

        // @ts-expect-error TS(2339): Property 'downloadId' does not exist on type '{}'.
        objDii.downloadId = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'blockSize' does not exist on type '{}'.
        objDii.blockSize = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'windowSize' does not exist on type '{}'.
        objDii.windowSize = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'ackPeriod' does not exist on type '{}'.
        objDii.ackPeriod = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'tCDownloadWindow' does not exist on type... Remove this comment to see the full error message
        objDii.tCDownloadWindow = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'tCDownloadScenario' does not exist on ty... Remove this comment to see the full error message
        objDii.tCDownloadScenario = reader.uimsbf(32);

        let descriptorLength = (reader.buffer[reader.position >> 3] << 8) | reader.buffer[(reader.position >> 3) + 1];
        // @ts-expect-error TS(2339): Property 'compatibilityDescriptor' does not exist ... Remove this comment to see the full error message
        objDii.compatibilityDescriptor = new TsDescriptorCompatibility(reader.readBytesRaw(2 + descriptorLength)).decode();

        // @ts-expect-error TS(2339): Property 'numberOfModules' does not exist on type ... Remove this comment to see the full error message
        objDii.numberOfModules = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'modules' does not exist on type '{}'.
        objDii.modules = [];

        // @ts-expect-error TS(2339): Property 'numberOfModules' does not exist on type ... Remove this comment to see the full error message
        for (let i = 0; i < objDii.numberOfModules; i++) {
            let module = {};

            // @ts-expect-error TS(2339): Property 'moduleId' does not exist on type '{}'.
            module.moduleId = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'moduleSize' does not exist on type '{}'.
            module.moduleSize = reader.uimsbf(32);
            // @ts-expect-error TS(2339): Property 'moduleVersion' does not exist on type '{... Remove this comment to see the full error message
            module.moduleVersion = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'moduleInfoLength' does not exist on type... Remove this comment to see the full error message
            module.moduleInfoLength = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'moduleInfo' does not exist on type '{}'.
            module.moduleInfo = new TsModuleDescriptors(reader.readBytesRaw(module.moduleInfoLength)).decode();

            // @ts-expect-error TS(2339): Property 'modules' does not exist on type '{}'.
            objDii.modules.push(module);
        }

        // @ts-expect-error TS(2339): Property 'privateDataLength' does not exist on typ... Remove this comment to see the full error message
        objDii.privateDataLength = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'privateData' does not exist on type '{}'... Remove this comment to see the full error message
        objDii.privateData = new TsModuleDescriptors(reader.readBytesRaw(objDii.privateDataLength)).decode();

        return objDii;
    }
}

class TsDsmccMessageDownloadDataBlock {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDdb = {};

        // @ts-expect-error TS(2339): Property 'protocolDiscriminator' does not exist on... Remove this comment to see the full error message
        objDdb.protocolDiscriminator = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'dsmccType' does not exist on type '{}'.
        objDdb.dsmccType = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'messageId' does not exist on type '{}'.
        objDdb.messageId = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'downloadId' does not exist on type '{}'.
        objDdb.downloadId = reader.uimsbf(32);
        reader.next(8);    // reserved
        // @ts-expect-error TS(2339): Property 'adaptationLength' does not exist on type... Remove this comment to see the full error message
        objDdb.adaptationLength = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'messageLength' does not exist on type '{... Remove this comment to see the full error message
        objDdb.messageLength = reader.uimsbf(16);

        // @ts-expect-error TS(2339): Property 'adaptationLength' does not exist on type... Remove this comment to see the full error message
        if (objDdb.adaptationLength > 0) {
            // @ts-expect-error TS(2339): Property 'adaptationType' does not exist on type '... Remove this comment to see the full error message
            objDdb.adaptationType = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'adaptationDataByte' does not exist on ty... Remove this comment to see the full error message
            objDdb.adaptationDataByte = reader.readBytes(objDdb.adaptationLength - 1);
        }

        // @ts-expect-error TS(2339): Property 'moduleId' does not exist on type '{}'.
        objDdb.moduleId = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'moduleVersion' does not exist on type '{... Remove this comment to see the full error message
        objDdb.moduleVersion = reader.uimsbf(8);
        reader.next(8);    // reserved
        // @ts-expect-error TS(2339): Property 'blockNumber' does not exist on type '{}'... Remove this comment to see the full error message
        objDdb.blockNumber = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'blockDataByte' does not exist on type '{... Remove this comment to see the full error message
        objDdb.blockDataByte = reader.readBytes(objDdb.messageLength - objDdb.adaptationLength - 6);

        return objDdb;
    }
}

class TsTableDsmcc {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (this.buffer[1] >> 7 === 1 && TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objDsmcc = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDsmcc._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        objDsmcc.table_id = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        objDsmcc.section_syntax_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'private_indicator' does not exist on typ... Remove this comment to see the full error message
        objDsmcc.private_indicator = reader.bslbf(1);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'dsmcc_section_length' does not exist on ... Remove this comment to see the full error message
        objDsmcc.dsmcc_section_length = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'table_id_extension' does not exist on ty... Remove this comment to see the full error message
        objDsmcc.table_id_extension = reader.uimsbf(16);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'version_number' does not exist on type '... Remove this comment to see the full error message
        objDsmcc.version_number = reader.uimsbf(5);
        // @ts-expect-error TS(2339): Property 'current_next_indicator' does not exist o... Remove this comment to see the full error message
        objDsmcc.current_next_indicator = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'section_number' does not exist on type '... Remove this comment to see the full error message
        objDsmcc.section_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'last_section_number' does not exist on t... Remove this comment to see the full error message
        objDsmcc.last_section_number = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'dsmcc_section_length' does not exist on ... Remove this comment to see the full error message
        let buffer = reader.readBytes(3 + objDsmcc.dsmcc_section_length - (reader.position >> 3) - 4);
        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        if (objDsmcc.table_id === 0x3B) {
            // @ts-expect-error TS(2339): Property 'message' does not exist on type '{}'.
            objDsmcc.message = new TsDsmccMessageDownloadInfoIndication(buffer).decode();
        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        } else if (objDsmcc.table_id === 0x3C) {
            // @ts-expect-error TS(2339): Property 'message' does not exist on type '{}'.
            objDsmcc.message = new TsDsmccMessageDownloadDataBlock(buffer).decode();
        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        } else if (objDsmcc.table_id === 0x3D) {
            // @ts-expect-error TS(2339): Property 'stream_descriptor' does not exist on typ... Remove this comment to see the full error message
            objDsmcc.stream_descriptor = buffer;
        // @ts-expect-error TS(2339): Property 'table_id' does not exist on type '{}'.
        } else if (objDsmcc.table_id === 0x3E) {
            // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
            objDsmcc.private_data_byte = buffer;
        }

        // @ts-expect-error TS(2339): Property 'section_syntax_indicator' does not exist... Remove this comment to see the full error message
        if (objDsmcc.section_syntax_indicator === 0) {
            // @ts-expect-error TS(2339): Property 'Checksum' does not exist on type '{}'.
            objDsmcc.Checksum = reader.readBytes(4);
        } else {
            // @ts-expect-error TS(2339): Property 'CRC_32' does not exist on type '{}'.
            objDsmcc.CRC_32 = reader.readBytes(4);
        }

        return objDsmcc;
    }
}

export default TsTableDsmcc;
