import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorBasicLocalEvent {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor: { [key: string]: any } = {};

        objDescriptor._raw = this.buffer;

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        reader.next(4);    // reserved_future_use
        objDescriptor.segmentation_mode = reader.uimsbf(4);
        objDescriptor.segmentation_info_length = reader.uimsbf(8);

        if (objDescriptor.segmentation_mode === 0) {
            // nothing
        } else if (objDescriptor.segmentation_mode === 1) {
            reader.next(7);    // reserved_future_use
            objDescriptor.start_time_NPT = reader.uimsbf(33);
            reader.next(7);    // reserved_future_use
            objDescriptor.end_time_NPT = reader.uimsbf(33);
        } else if (objDescriptor.segmentation_mode < 6) {
            objDescriptor.start_time = reader.uimsbf(24);
            objDescriptor.duration = reader.uimsbf(24);

            if (objDescriptor.segmentation_info_length === 10) {
                objDescriptor.start_time_extension = reader.uimsbf(12);
                reader.next(4);    // reserved_future_use
                objDescriptor.duration_extension = reader.uimsbf(12);
                reader.next(4);    // reserved_future_use
            }
        } else {
            reader.next(objDescriptor.segmentation_info_length << 3);    // reserved
        }

        objDescriptor.component_tags = [];

        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let component_tag: { [key: string]: any } = {};

            component_tag.component_tag = reader.uimsbf(8);

            objDescriptor.component_tags.push(component_tag);
        }

        return objDescriptor;
    }
}

export default TsDescriptorBasicLocalEvent;
