import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorCompatibility {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};

        // @ts-expect-error TS(2339): Property '_raw' does not exist on type '{}'.
        objDescriptor._raw = this.buffer;

        // @ts-expect-error TS(2339): Property 'compatibilityDescriptorLength' does not ... Remove this comment to see the full error message
        objDescriptor.compatibilityDescriptorLength = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'descriptorCount' does not exist on type ... Remove this comment to see the full error message
        objDescriptor.descriptorCount = reader.uimsbf(16);
        // @ts-expect-error TS(2339): Property 'descriptors' does not exist on type '{}'... Remove this comment to see the full error message
        objDescriptor.descriptors = [];

        // @ts-expect-error TS(2339): Property 'descriptorCount' does not exist on type ... Remove this comment to see the full error message
        for (let i = 0; i < objDescriptor.descriptorCount; i++) {
            let descriptor = {};

            // @ts-expect-error TS(2339): Property 'descriptorType' does not exist on type '... Remove this comment to see the full error message
            descriptor.descriptorType = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'descriptorLength' does not exist on type... Remove this comment to see the full error message
            descriptor.descriptorLength = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'specifierType' does not exist on type '{... Remove this comment to see the full error message
            descriptor.specifierType = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'specifierData' does not exist on type '{... Remove this comment to see the full error message
            descriptor.specifierData = reader.readBytes(3);
            // @ts-expect-error TS(2339): Property 'model' does not exist on type '{}'.
            descriptor.model = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'version' does not exist on type '{}'.
            descriptor.version = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'subDescriptorCount' does not exist on ty... Remove this comment to see the full error message
            descriptor.subDescriptorCount = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'subDescriptors' does not exist on type '... Remove this comment to see the full error message
            descriptor.subDescriptors = [];

            // @ts-expect-error TS(2339): Property 'subDescriptorCount' does not exist on ty... Remove this comment to see the full error message
            for (let j = 0; j < objDescriptor.subDescriptorCount; j++) {
                let subDescriptor = {};

                // @ts-expect-error TS(2339): Property 'subDescriptorType' does not exist on typ... Remove this comment to see the full error message
                subDescriptor.subDescriptorType = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'subDescriptorLength' does not exist on t... Remove this comment to see the full error message
                subDescriptor.subDescriptorLength = reader.uimsbf(8);
                // @ts-expect-error TS(2339): Property 'additionalInformation' does not exist on... Remove this comment to see the full error message
                subDescriptor.additionalInformation = reader.readBytes(subDescriptor.subDescriptorLength);

                // @ts-expect-error TS(2339): Property 'subDescriptors' does not exist on type '... Remove this comment to see the full error message
                descriptor.subDescriptors.push(subDescriptor);
            }

            // @ts-expect-error TS(2339): Property 'descriptors' does not exist on type '{}'... Remove this comment to see the full error message
            objDescriptor.descriptors.push(descriptor);
        }

        return objDescriptor;
    }
}

export default TsDescriptorCompatibility;
