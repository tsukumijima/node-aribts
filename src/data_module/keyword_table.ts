import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleKeywordTable {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule = {};

        // @ts-expect-error TS(2339): Property 'number_of_loop' does not exist on type '... Remove this comment to see the full error message
        objDataModule.number_of_loop = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'keyword_tables' does not exist on type '... Remove this comment to see the full error message
        objDataModule.keyword_tables = [];

        // @ts-expect-error TS(2339): Property 'number_of_loop' does not exist on type '... Remove this comment to see the full error message
        for (let i = 0; i < objDataModule.number_of_loop; i++) {
            let keyword_table = {};

            // @ts-expect-error TS(2339): Property 'name_length' does not exist on type '{}'... Remove this comment to see the full error message
            keyword_table.name_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'name_char' does not exist on type '{}'.
            keyword_table.name_char = reader.readBytes(objDataModule.name_length);

            // @ts-expect-error TS(2339): Property 'keyword_tables' does not exist on type '... Remove this comment to see the full error message
            objDataModule.keyword_tables.push(keyword_table);
        }

        return objDataModule;
    }
}

export default TsDataModuleKeywordTable;
