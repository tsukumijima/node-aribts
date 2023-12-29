import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptorCompatibility from "./compatibility";
import TsModuleDescriptors from "../module_descriptors";

class TsDescriptorDownloadContent {
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

        // @ts-expect-error TS(2339): Property 'reboot' does not exist on type '{}'.
        objDescriptor.reboot = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'add_on' does not exist on type '{}'.
        objDescriptor.add_on = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'compatibility_flag' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.compatibility_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'module_info_flag' does not exist on type... Remove this comment to see the full error message
        objDescriptor.module_info_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'text_info_flag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.text_info_flag = reader.bslbf(1);
        reader.next(3);    // reserved
        // @ts-expect-error TS(2339): Property 'component_size' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.component_size = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'download_id' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.download_id = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'time_out_value_DII' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.time_out_value_DII = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'leak_rate' does not exist on type '{}'.
        objDescriptor.leak_rate = reader.uimsbf(22);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.component_tag = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'compatibility_flag' does not exist on ty... Remove this comment to see the full error message
        if (objDescriptor.compatibility_flag === 1) {
            let descriptorLength = (reader.buffer[reader.position >> 3] << 8) | reader.buffer[(reader.position >> 3) + 1];
            // @ts-expect-error TS(2339): Property 'compatibilityDescriptor' does not exist ... Remove this comment to see the full error message
            objDescriptor.compatibilityDescriptor = new TsDescriptorCompatibility(reader.readBytesRaw(2 + descriptorLength)).decode();
        }

        // @ts-expect-error TS(2339): Property 'module_info_flag' does not exist on type... Remove this comment to see the full error message
        if (objDescriptor.module_info_flag === 1) {
            // @ts-expect-error TS(2339): Property 'num_of_modules' does not exist on type '... Remove this comment to see the full error message
            objDescriptor.num_of_modules = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'modules' does not exist on type '{}'.
            objDescriptor.modules = [];

            // @ts-expect-error TS(2339): Property 'num_of_modules' does not exist on type '... Remove this comment to see the full error message
            for (let i = 0; i < objDescriptor.num_of_modules; i++) {
                let _module = {};

                // @ts-expect-error TS(2339): Property 'module_id' does not exist on type '{}'.
                _module.module_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'module_size' does not exist on type '{}'... Remove this comment to see the full error message
                _module.module_size = reader.uimsbf(32);
                // @ts-expect-error TS(2339): Property 'module_info_length' does not exist on ty... Remove this comment to see the full error message
                _module.module_info_length = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'module_info_byte' does not exist on type... Remove this comment to see the full error message
                _module.module_info_byte = new TsModuleDescriptors(reader.readBytesRaw(_module.module_info_length)).decode();

                // @ts-expect-error TS(2339): Property 'modules' does not exist on type '{}'.
                objDescriptor.modules.push(_module);
            }
        }

        // @ts-expect-error TS(2339): Property 'private_data_length' does not exist on t... Remove this comment to see the full error message
        objDescriptor.private_data_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.private_data_byte = reader.readBytes(objDescriptor.private_data_length);

        // @ts-expect-error TS(2339): Property 'text_info_flag' does not exist on type '... Remove this comment to see the full error message
        if (objDescriptor.text_info_flag === 1) {
            // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
            objDescriptor.ISO_639_language_code = reader.readBytes(3);
            // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.text_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
            objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);
        }

        return objDescriptor;
    }
}

export default TsDescriptorDownloadContent;
