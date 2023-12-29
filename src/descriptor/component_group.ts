import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorComponentGroup {
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

        // @ts-expect-error TS(2339): Property 'component_group_type' does not exist on ... Remove this comment to see the full error message
        objDescriptor.component_group_type = reader.uimsbf(3);
        // @ts-expect-error TS(2339): Property 'total_bit_rate_flag' does not exist on t... Remove this comment to see the full error message
        objDescriptor.total_bit_rate_flag = reader.uimsbf(1);
        // @ts-expect-error TS(2339): Property 'num_of_group' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.num_of_group = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'groups' does not exist on type '{}'.
        objDescriptor.groups = [];

        // @ts-expect-error TS(2339): Property 'num_of_group' does not exist on type '{}... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.num_of_group; i++) {
            let group = {};

            // @ts-expect-error TS(2339): Property 'component_group_id' does not exist on ty... Remove this comment to see the full error message
            group.component_group_id = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'num_of_CA_unit' does not exist on type '... Remove this comment to see the full error message
            group.num_of_CA_unit = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'CA_units' does not exist on type '{}'.
            group.CA_units = [];

            // @ts-expect-error TS(2339): Property 'num_of_CA_unit' does not exist on type '... Remove this comment to see the full error message
            for (let j = 0; j < group.num_of_CA_unit; j++) {
                let CA_unit = {};

                // @ts-expect-error TS(2339): Property 'CA_unit_id' does not exist on type '{}'.
                CA_unit.CA_unit_id = reader.uimsbf(4);
                // @ts-expect-error TS(2339): Property 'num_of_component' does not exist on type... Remove this comment to see the full error message
                CA_unit.num_of_component = reader.uimsbf(4);
                // @ts-expect-error TS(2339): Property 'component_tags' does not exist on type '... Remove this comment to see the full error message
                CA_unit.component_tags = [];

                // @ts-expect-error TS(2339): Property 'num_of_component' does not exist on type... Remove this comment to see the full error message
                for (let k = 0; k < CA_unit.num_of_component; k++) {
                    let component_tag = {};

                    // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
                    component_tag.component_tag = reader.uimsbf(8);

                    // @ts-expect-error TS(2339): Property 'component_tags' does not exist on type '... Remove this comment to see the full error message
                    CA_unit.component_tags.push(component_tag);
                }

                // @ts-expect-error TS(2339): Property 'CA_units' does not exist on type '{}'.
                group.CA_units.push(CA_unit);
            }

            // @ts-expect-error TS(2339): Property 'total_bit_rate_flag' does not exist on t... Remove this comment to see the full error message
            if (objDescriptor.total_bit_rate_flag === 1) {
                // @ts-expect-error TS(2339): Property 'total_bit_rate' does not exist on type '... Remove this comment to see the full error message
                group.total_bit_rate = reader.uimsbf(8);
            }

            // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
            group.text_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
            group.text_char = reader.readBytes(group.text_length);

            // @ts-expect-error TS(2339): Property 'groups' does not exist on type '{}'.
            objDescriptor.groups.push(group);
        }

        return objDescriptor;
    }
}

export default TsDescriptorComponentGroup;
