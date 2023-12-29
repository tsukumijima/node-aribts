import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleKeywordTable {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule: { [key: string]: any } = {};

        objDataModule.number_of_loop = reader.uimsbf(8);
        objDataModule.keyword_tables = [];

        for (let i = 0; i < objDataModule.number_of_loop; i++) {
            let keyword_table: { [key: string]: any } = {};

            keyword_table.name_length = reader.uimsbf(8);
            keyword_table.name_char = reader.readBytes(objDataModule.name_length);

            objDataModule.keyword_tables.push(keyword_table);
        }

        return objDataModule;
    }
}

export default TsDataModuleKeywordTable;
