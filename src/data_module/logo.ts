import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleLogo {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule: { [key: string]: any } = {};

        objDataModule.logo_type = reader.uimsbf(8);
        objDataModule.number_of_loop = reader.uimsbf(16);
        objDataModule.logos = [];

        for (let i = 0; i < objDataModule.number_of_loop; i++) {
            let logo: { [key: string]: any } = {};

            reader.next(7);    // reserved
            logo.logo_id = reader.uimsbf(9);
            logo.number_of_services = reader.uimsbf(8);
            logo.services = [];

            for (let j = 0; j < logo.number_of_services; j++) {
                let service: { [key: string]: any } = {};

                service.original_network_id = reader.uimsbf(16);
                service.transport_stream_id = reader.uimsbf(16);
                service.service_id = reader.uimsbf(16);

                logo.services.push(service);
            }

            logo.data_size = reader.uimsbf(16);
            logo.data_byte = reader.readBytes(logo.data_size);

            objDataModule.logos.push(logo);
        }

        return objDataModule;
    }
}

export default TsDataModuleLogo;
