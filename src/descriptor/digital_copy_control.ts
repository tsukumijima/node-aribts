import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorDigitalCopyControl {
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

        // @ts-expect-error TS(2339): Property 'digital_recording_control_data' does not... Remove this comment to see the full error message
        objDescriptor.digital_recording_control_data = reader.bslbf(2);
        // @ts-expect-error TS(2339): Property 'maximum_bitrate_flag' does not exist on ... Remove this comment to see the full error message
        objDescriptor.maximum_bitrate_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'component_control_flag' does not exist o... Remove this comment to see the full error message
        objDescriptor.component_control_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'user_defined' does not exist on type '{}... Remove this comment to see the full error message
        objDescriptor.user_defined = reader.bslbf(4);

        // @ts-expect-error TS(2339): Property 'maximum_bitrate_flag' does not exist on ... Remove this comment to see the full error message
        if (objDescriptor.maximum_bitrate_flag === 1) {
            // @ts-expect-error TS(2339): Property 'maximum_bitrate' does not exist on type ... Remove this comment to see the full error message
            objDescriptor.maximum_bitrate = reader.uimsbf(8);
        }

        // @ts-expect-error TS(2339): Property 'component_control_flag' does not exist o... Remove this comment to see the full error message
        if (objDescriptor.component_control_flag === 1) {
            // @ts-expect-error TS(2339): Property 'component_control_length' does not exist... Remove this comment to see the full error message
            objDescriptor.component_control_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'component_controls' does not exist on ty... Remove this comment to see the full error message
            objDescriptor.component_controls = [];

            // @ts-expect-error TS(2339): Property 'component_control_length' does not exist... Remove this comment to see the full error message
            for (let i = 0; i < objDescriptor.component_control_length; i += 2) {
                let component_control = {};

                // @ts-expect-error TS(2339): Property 'component_tag' does not exist on type '{... Remove this comment to see the full error message
                component_control.component_tag = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'digital_recording_control_data' does not... Remove this comment to see the full error message
                component_control.digital_recording_control_data = reader.bslbf(2);
                // @ts-expect-error TS(2339): Property 'maximum_bitrate_flag' does not exist on ... Remove this comment to see the full error message
                component_control.maximum_bitrate_flag = reader.bslbf(1);
                reader.next(1);    // reserved_future_use
                // @ts-expect-error TS(2339): Property 'user_defined' does not exist on type '{}... Remove this comment to see the full error message
                component_control.user_defined = reader.bslbf(4);

                // @ts-expect-error TS(2339): Property 'maximum_bitrate_flag' does not exist on ... Remove this comment to see the full error message
                if (component_control.maximum_bitrate_flag === 1) {
                    // @ts-expect-error TS(2339): Property 'maximum_bitrate' does not exist on type ... Remove this comment to see the full error message
                    component_control.maximum_bitrate = reader.uimsbf(8);
                    i += 1;
                }

                // @ts-expect-error TS(2339): Property 'component_controls' does not exist on ty... Remove this comment to see the full error message
                objDescriptor.component_controls.push(component_control);
            }
        }

        return objDescriptor;
    }
}

export default TsDescriptorDigitalCopyControl;
