import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorMaterialInformation {
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

        // @ts-expect-error TS(2339): Property 'descriptor_number' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_number = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'last_descriptor_number' does not exist o... Remove this comment to see the full error message
        objDescriptor.last_descriptor_number = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'number_of_material_set' does not exist o... Remove this comment to see the full error message
        objDescriptor.number_of_material_set = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'material_sets' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.material_sets = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let material_set = {};

            // @ts-expect-error TS(2339): Property 'material_type' does not exist on type '{... Remove this comment to see the full error message
            material_set.material_type = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'material_name_length' does not exist on ... Remove this comment to see the full error message
            material_set.material_name_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'material_name_char' does not exist on ty... Remove this comment to see the full error message
            material_set.material_name_char = reader.readBytes(material_set.material_name_length);
            // @ts-expect-error TS(2339): Property 'material_code_type' does not exist on ty... Remove this comment to see the full error message
            material_set.material_code_type = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'material_code_length' does not exist on ... Remove this comment to see the full error message
            material_set.material_code_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'material_code_char' does not exist on ty... Remove this comment to see the full error message
            material_set.material_code_char = reader.readBytes(material_set.material_code_length);
            // @ts-expect-error TS(2339): Property 'material_period_flag' does not exist on ... Remove this comment to see the full error message
            material_set.material_period_flag = reader.bslbf(1);
            reader.next(7);    // reserved_future_use

            // @ts-expect-error TS(2339): Property 'material_period_flag' does not exist on ... Remove this comment to see the full error message
            if (material_set.material_period_flag === 1) {
                // @ts-expect-error TS(2339): Property 'material_period' does not exist on type ... Remove this comment to see the full error message
                material_set.material_period = reader.readBytes(3);
            }

            // @ts-expect-error TS(2339): Property 'material_url_type' does not exist on typ... Remove this comment to see the full error message
            material_set.material_url_type = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'material_url_length' does not exist on t... Remove this comment to see the full error message
            material_set.material_url_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'material_url_char' does not exist on typ... Remove this comment to see the full error message
            material_set.material_url_char = reader.readBytes(material_set.material_url_length);
            // @ts-expect-error TS(2339): Property 'reserved_future_use_length' does not exi... Remove this comment to see the full error message
            material_set.reserved_future_use_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'reserved_future_use_length' does not exi... Remove this comment to see the full error message
            reader.next(8 * material_set.reserved_future_use_length);    // reserved_future_use

            // @ts-expect-error TS(2339): Property 'material_sets' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.material_sets.push(material_set);
        }

        return objDescriptor;
    }
}

export default TsDescriptorMaterialInformation;
