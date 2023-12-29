import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorHierarchy {
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

        reader.next(1);    // reserved
        // @ts-expect-error TS(2339): Property 'temporal_scalability_flag' does not exis... Remove this comment to see the full error message
        objDescriptor.temporal_scalability_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'spatial_scalability_flag' does not exist... Remove this comment to see the full error message
        objDescriptor.spatial_scalability_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'quality_scalability_flag' does not exist... Remove this comment to see the full error message
        objDescriptor.quality_scalability_flag = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'hierarchy_type' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.hierarchy_type = reader.uimsbf(4);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'hierarchy_layer_index' does not exist on... Remove this comment to see the full error message
        objDescriptor.hierarchy_layer_index = reader.uimsbf(6);
        // @ts-expect-error TS(2339): Property 'tref_present_flag' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.tref_present_flag = reader.bslbf(1);
        reader.next(1);    // reserved
        // @ts-expect-error TS(2339): Property 'hierarchy_embedded_layer_index' does not... Remove this comment to see the full error message
        objDescriptor.hierarchy_embedded_layer_index = reader.uimsbf(6);
        reader.next(2);    // reserved
        // @ts-expect-error TS(2339): Property 'hierarchy_channel' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.hierarchy_channel = reader.uimsbf(6);

        return objDescriptor;
    }
}

export default TsDescriptorHierarchy;
