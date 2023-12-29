import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleCommonTable {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule = {};

        // @ts-expect-error TS(2339): Property 'number_of_loop' does not exist on type '... Remove this comment to see the full error message
        objDataModule.number_of_loop = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'common_tables' does not exist on type '{... Remove this comment to see the full error message
        objDataModule.common_tables = [];

        // @ts-expect-error TS(2339): Property 'number_of_loop' does not exist on type '... Remove this comment to see the full error message
        for (let i = 0; i < objDataModule.number_of_loop; i++) {
            let common_table = {};

            // @ts-expect-error TS(2339): Property 'table_code' does not exist on type '{}'.
            common_table.table_code = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'level_1_name_length' does not exist on t... Remove this comment to see the full error message
            common_table.level_1_name_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'name_char' does not exist on type '{}'.
            common_table.name_char = reader.readBytes(objDataModule.level_1_name_length);
            // @ts-expect-error TS(2339): Property 'level_2_name_length' does not exist on t... Remove this comment to see the full error message
            common_table.level_2_name_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'name_char' does not exist on type '{}'.
            common_table.name_char = reader.readBytes(objDataModule.level_2_name_length);

            // @ts-expect-error TS(2339): Property 'common_tables' does not exist on type '{... Remove this comment to see the full error message
            objDataModule.common_tables.push(common_table);
        }

        return objDataModule;
    }
}

export default TsDataModuleCommonTable;
