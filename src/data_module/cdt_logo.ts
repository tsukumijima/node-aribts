import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleCdtLogo {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule: { [key: string]: any } = {};

        objDataModule.logo_type = reader.uimsbf(8);
        reader.next(7);    // reserved_future_use
        objDataModule.logo_id = reader.uimsbf(9);
        reader.next(4);    // reserved_future_use
        objDataModule.logo_version = reader.uimsbf(12);
        objDataModule.data_size = reader.uimsbf(16);
        objDataModule.data_byte = reader.readBytes(objDataModule.data_size);

        return objDataModule;
    }
}

export default TsDataModuleCdtLogo;
