import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleCommonTable {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule: { [key: string]: any } = {};

        objDataModule.number_of_loop = reader.uimsbf(8);
        objDataModule.common_tables = [];

        for (let i = 0; i < objDataModule.number_of_loop; i++) {
            let common_table: { [key: string]: any } = {};

            common_table.table_code = reader.uimsbf(8);
            common_table.level_1_name_length = reader.uimsbf(8);
            common_table.name_char = reader.readBytes(objDataModule.level_1_name_length);
            common_table.level_2_name_length = reader.uimsbf(8);
            common_table.name_char = reader.readBytes(objDataModule.level_2_name_length);

            objDataModule.common_tables.push(common_table);
        }

        return objDataModule;
    }
}

export default TsDataModuleCommonTable;
