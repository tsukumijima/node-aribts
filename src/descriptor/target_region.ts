import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorTargetRegion {
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

        // @ts-expect-error TS(2339): Property 'region_spec_type' does not exist on type... Remove this comment to see the full error message
        objDescriptor.region_spec_type = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'target_region_spec' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.target_region_spec = {};

        // @ts-expect-error TS(2339): Property 'region_spec_type' does not exist on type... Remove this comment to see the full error message
        if (objDescriptor.region_spec_type === 0x01) {
            // @ts-expect-error TS(2339): Property 'target_region_spec' does not exist on ty... Remove this comment to see the full error message
            objDescriptor.target_region_spec.prefecture_bitmap = reader.readBytes(7);
        }

        return objDescriptor;
    }
}

export default TsDescriptorTargetRegion;
