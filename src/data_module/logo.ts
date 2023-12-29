import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDataModuleLogo {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDataModule = {};

        // @ts-expect-error TS(2339): Property 'logo_type' does not exist on type '{}'.
        objDataModule.logo_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'number_of_loop' does not exist on type '... Remove this comment to see the full error message
        objDataModule.number_of_loop = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'logos' does not exist on type '{}'.
        objDataModule.logos = [];

        // @ts-expect-error TS(2339): Property 'number_of_loop' does not exist on type '... Remove this comment to see the full error message
        for (let i = 0; i < objDataModule.number_of_loop; i++) {
            let logo = {};

            reader.next(7);    // reserved
            // @ts-expect-error TS(2339): Property 'logo_id' does not exist on type '{}'.
            logo.logo_id = reader.uimsbf(9);
            // @ts-expect-error TS(2339): Property 'number_of_services' does not exist on ty... Remove this comment to see the full error message
            logo.number_of_services = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
            logo.services = [];

            // @ts-expect-error TS(2339): Property 'number_of_services' does not exist on ty... Remove this comment to see the full error message
            for (let j = 0; j < logo.number_of_services; j++) {
                let service = {};

                // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
                service.original_network_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
                service.transport_stream_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
                service.service_id = reader.uimsbf(16);

                // @ts-expect-error TS(2339): Property 'services' does not exist on type '{}'.
                logo.services.push(service);
            }

            // @ts-expect-error TS(2339): Property 'data_size' does not exist on type '{}'.
            logo.data_size = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'data_byte' does not exist on type '{}'.
            logo.data_byte = reader.readBytes(logo.data_size);

            // @ts-expect-error TS(2339): Property 'logos' does not exist on type '{}'.
            objDataModule.logos.push(logo);
        }

        return objDataModule;
    }
}

export default TsDataModuleLogo;
