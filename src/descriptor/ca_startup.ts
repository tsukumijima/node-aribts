import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCaStartup {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDescriptor._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'descriptor_tag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_length = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'CA_system_ID' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.CA_system_ID = reader.uimsbf(16);
        reader.next(3);    // '111'
        // @ts-expect-error TS(2339): Property 'CA_program_ID' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.CA_program_ID = reader.uimsbf(13);
        // @ts-expect-error TS(2339): Property 'second_load_flag' does not exist on type... Remove this comment to see the full error message
        objDescriptor.second_load_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'load_indicator' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.load_indicator = reader.bslbf(7);

        // @ts-expect-error TS(2339): Property 'second_load_flag' does not exist on type... Remove this comment to see the full error message
        if (objDescriptor.second_load_flag === 1) {
            reader.next(3);    // '111'
            // @ts-expect-error TS(2339): Property 'CA_program_ID' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.CA_program_ID = reader.uimsbf(13);
            reader.next(1);    // '1'
            // @ts-expect-error TS(2339): Property 'load_indicator' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.load_indicator = reader.bslbf(7);
        }

        // @ts-expect-error TS(2339): Property 'exclusion_ID_num' does not exist on type... Remove this comment to see the full error message
        objDescriptor.exclusion_ID_num = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'exclusion_ID' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.exclusion_ID = [];

        // @ts-expect-error TS(2339): Property 'exclusion_ID_num' does not exist on type... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.exclusion_ID_num; i++) {
            let id = {};

            reader.next(3);    // '111'
            // @ts-expect-error TS(2339): Property 'exclusion_CA_program_ID' does not exist ... Remove this comment to see the full error message
            id.exclusion_CA_program_ID = reader.uimsbf(13);

            // @ts-expect-error TS(2339): Property 'exclusion_ID' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.exclusion_ID.push(id);
        }

        // @ts-expect-error TS(2339): Property 'load_security_info_len' does not exist o... Remove this comment to see the full error message
        objDescriptor.load_security_info_len = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'load_security_info_byte' does not exist ... Remove this comment to see the full error message
        objDescriptor.load_security_info_byte = reader.readBytes(objDescriptor.load_security_info_len);

        // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.private_data_byte = reader.readBytes(2 + objDescriptor.descriptor_length - (reader.position >> 3));

        return objDescriptor;
    }
}

export default TsDescriptorCaStartup;
