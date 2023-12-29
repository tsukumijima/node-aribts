import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCaContractInfo {
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

        // @ts-expect-error TS(2339): Property 'CA_system_id' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.CA_system_id = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'CA_unit_id' does not exist on type '{}'.
        objDescriptor.CA_unit_id = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'num_of_component' does not exist on type... Remove this comment to see the full error message
        objDescriptor.num_of_component = reader.uimsbf(4);
        // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
        objDescriptor.components = [];

        // @ts-expect-error TS(2339): Property 'num_of_component' does not exist on type... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.num_of_component; i++) {
            let component = {};

            // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
            component.component_tag = reader.uimsbf(8);

            // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
            objDescriptor.components.push(component);
        }

        // @ts-expect-error TS(2339): Property 'contract_verification_info_length' does ... Remove this comment to see the full error message
        objDescriptor.contract_verification_info_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'contract_verification_info' does not exi... Remove this comment to see the full error message
        objDescriptor.contract_verification_info = reader.readBytes(objDescriptor.contract_verification_info_length);
        // @ts-expect-error TS(2339): Property 'fee_name_length' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.fee_name_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'fee_name' does not exist on type '{}'.
        objDescriptor.fee_name = reader.readBytes(objDescriptor.fee_name_length);

        return objDescriptor;
    }
}

export default TsDescriptorCaContractInfo;
