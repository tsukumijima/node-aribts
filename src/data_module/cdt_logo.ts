import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleCdtLogo {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule = {};

        // @ts-expect-error TS(2339): Property 'logo_type' does not exist on type '{}'.
        objDataModule.logo_type = reader.uimsbf(8);
        reader.next(7);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'logo_id' does not exist on type '{}'.
        objDataModule.logo_id = reader.uimsbf(9);
        reader.next(4);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'logo_version' does not exist on type '{}... Remove this comment to see the full error message
        objDataModule.logo_version = reader.uimsbf(12);
        // @ts-expect-error TS(2339): Property 'data_size' does not exist on type '{}'.
        objDataModule.data_size = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'data_byte' does not exist on type '{}'.
        objDataModule.data_byte = reader.readBytes(objDataModule.data_size);

        return objDataModule;
    }
}

export default TsDataModuleCdtLogo;
