"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDescriptorNearVideoOnDemandReference {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objDescriptor = {};
        objDescriptor._raw = this.buffer;
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        objDescriptor.descriptor_length = reader.uimsbf(8);
        objDescriptor.NVOD_references = [];
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let NVOD_reference = {};
            NVOD_reference.transport_stream_id = reader.uimsbf(16);
            NVOD_reference.original_network_id = reader.uimsbf(16);
            NVOD_reference.service_id = reader.uimsbf(16);
            objDescriptor.NVOD_references.push(NVOD_reference);
        }
        return objDescriptor;
    }
}
exports.default = TsDescriptorNearVideoOnDemandReference;
//# sourceMappingURL=near_video_on_demand_reference.js.map