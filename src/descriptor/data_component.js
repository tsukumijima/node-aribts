"use strict";

import TsReader from "../reader";

class TsDescriptorDataComponent {
    constructor(buffer) {
        this.buffer = buffer;
    }

    decode() {
        let reader = new TsReader(this.buffer);
        let objDescriptor = {};

        objDescriptor._raw = this.buffer;

        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);

        objDescriptor.data_component_id = reader.uimsbf(16);
        objDescriptor.additional_data_component_info = reader.readBytes(objDescriptor.descriptor_length - 2);

        return objDescriptor;
    }
}

export default TsDescriptorDataComponent;
