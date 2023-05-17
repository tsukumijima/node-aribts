export = TsTableDsmcc;
declare class TsTableDsmcc {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        table_id: number;
        section_syntax_indicator: number;
        private_indicator: number;
        dsmcc_section_length: number;
        table_id_extension: number;
        version_number: number;
        current_next_indicator: number;
        section_number: number;
        last_section_number: number;
        message: {
            protocolDiscriminator: number;
            dsmccType: number;
            messageId: number;
            transaction_id: number;
            adaptationLength: number;
            messageLength: number;
            adaptationType: number;
            adaptationDataByte: Buffer;
            downloadId: number;
            blockSize: number;
            windowSize: number;
            ackPeriod: number;
            tCDownloadWindow: number;
            tCDownloadScenario: number;
            compatibilityDescriptor: {
                _raw: any;
                compatibilityDescriptorLength: number;
                descriptorCount: number;
                descriptors: any[];
            };
            numberOfModules: number;
            modules: any[];
            privateDataLength: number;
            privateData: ({
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                text_char: Buffer;
            } | {
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                position: number;
                moduleId: number;
            } | {
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                CRC_32: Buffer;
            } | {
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                descriptor: Buffer;
            })[];
        } | {
            protocolDiscriminator: number;
            dsmccType: number;
            messageId: number;
            downloadId: number;
            adaptationLength: number;
            messageLength: number;
            adaptationType: number;
            adaptationDataByte: Buffer;
            moduleId: number;
            moduleVersion: number;
            blockNumber: number;
            blockDataByte: Buffer;
        };
        stream_descriptor: Buffer;
        private_data_byte: Buffer;
        Checksum: Buffer;
        CRC_32: Buffer;
    };
}
