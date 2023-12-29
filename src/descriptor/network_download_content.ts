import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptorCompatibility from "./compatibility";

class TsDescriptorNetworkDownloadContent {
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
        // @ts-expect-error TS(2339): Property 'text_info_flag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.text_info_flag = reader.bslbf(1);
        reader.next(4);    // reserved
        // @ts-expect-error TS(2339): Property 'component_size' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.component_size = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'session_protcol_number' does not exist o... Remove this comment to see the full error message
        objDescriptor.session_protcol_number = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'session_id' does not exist on type '{}'.
        objDescriptor.session_id = reader.uimsbf(32);
        // @ts-expect-error TS(2339): Property 'retry' does not exist on type '{}'.
        objDescriptor.retry = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'connect_timer' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.connect_timer = reader.uimsbf(24);
        // @ts-expect-error TS(2339): Property 'address_type' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.address_type = reader.uimsbf(8);

        // @ts-expect-error TS(2339): Property 'address_type' does not exist on type '{}... Remove this comment to see the full error message
        if (objDescriptor.address_type === 0x00) {
            // @ts-expect-error TS(2339): Property 'ipv4_address' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.ipv4_address = reader.bytesRead(4);
            // @ts-expect-error TS(2339): Property 'port_number' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.port_number = reader.uimsbf(16);
        }

        // @ts-expect-error TS(2339): Property 'address_type' does not exist on type '{}... Remove this comment to see the full error message
        if (objDescriptor.address_type === 0x01) {
            // @ts-expect-error TS(2339): Property 'ipv6_address' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.ipv6_address = reader.bytesRead(16);
            // @ts-expect-error TS(2339): Property 'port_number' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.port_number = reader.uimsbf(16);
        }

        // @ts-expect-error TS(2339): Property 'address_type' does not exist on type '{}... Remove this comment to see the full error message
        if (objDescriptor.address_type === 0x02) {
            // @ts-expect-error TS(2339): Property 'URL_length' does not exist on type '{}'.
            objDescriptor.URL_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'URL_byte' does not exist on type '{}'.
            objDescriptor.URL_byte = reader.bytesRead(objDescriptor.URL_length);
        }

        // @ts-expect-error TS(2339): Property 'compatibility_flag' does not exist on ty... Remove this comment to see the full error message
        if (objDescriptor.compatibility_flag === 1) {
            let descriptorLength = (reader.buffer[reader.position >> 3] << 8) | reader.buffer[(reader.position >> 3) + 1];
            // @ts-expect-error TS(2339): Property 'compatibilityDescriptor' does not exist ... Remove this comment to see the full error message
            objDescriptor.compatibilityDescriptor = new TsDescriptorCompatibility(reader.readBytesRaw(2 + descriptorLength)).decode();
        }

        // @ts-expect-error TS(2339): Property 'private_data_length' does not exist on t... Remove this comment to see the full error message
        objDescriptor.private_data_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'private_data_byte' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.private_data_byte = reader.readBytes(objDescriptor.private_data_length);

        // @ts-expect-error TS(2339): Property 'text_info_flag' does not exist on type '... Remove this comment to see the full error message
        if (objDescriptor.text_info_flag === 1) {
            // @ts-expect-error TS(2339): Property 'ISO_639_language_code' does not exist on... Remove this comment to see the full error message
            objDescriptor.ISO_639_language_code = reader.uimsbf(24);
            // @ts-expect-error TS(2339): Property 'text_length' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.text_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'text_char' does not exist on type '{}'.
            objDescriptor.text_char = reader.readBytes(objDescriptor.text_length);
        }

        return objDescriptor;
    }
}

export default TsDescriptorNetworkDownloadContent;
