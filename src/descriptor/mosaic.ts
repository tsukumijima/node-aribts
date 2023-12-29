import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorMosaic {
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

        // @ts-expect-error TS(2339): Property 'descriptor_tag' does not exist on type '... Remove this comment to see the full error message
        objDescriptor.descriptor_tag = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        objDescriptor.descriptor_length = reader.uimsbf(8);
        // @ts-expect-error TS(2339): Property 'mosaic_entry_point' does not exist on ty... Remove this comment to see the full error message
        objDescriptor.mosaic_entry_point = reader.bslbf(1);
        // @ts-expect-error TS(2339): Property 'number_of_horizontal_elementary_cells' d... Remove this comment to see the full error message
        objDescriptor.number_of_horizontal_elementary_cells = reader.uimsbf(3);
        reader.next(1);    // reserved_future_use
        // @ts-expect-error TS(2339): Property 'number_of_vertical_elementary_cells' doe... Remove this comment to see the full error message
        objDescriptor.number_of_vertical_elementary_cells = reader.uimsbf(3);
        // @ts-expect-error TS(2339): Property 'logical_cells' does not exist on type '{... Remove this comment to see the full error message
        objDescriptor.logical_cells = [];

        // @ts-expect-error TS(2339): Property 'descriptor_length' does not exist on typ... Remove this comment to see the full error message
        while (reader.position >> 3 < 2 + objDescriptor.descriptor_length) {
            let logical_cell = {};

            // @ts-expect-error TS(2339): Property 'logical_cell_id' does not exist on type ... Remove this comment to see the full error message
            logical_cell.logical_cell_id = reader.uimsbf(6);
            reader.next(7);    // reserved_future_use
            // @ts-expect-error TS(2339): Property 'logical_cell_presentation_info' does not... Remove this comment to see the full error message
            logical_cell.logical_cell_presentation_info = reader.uimsbf(3);
            // @ts-expect-error TS(2339): Property 'elementary_cell_field_length' does not e... Remove this comment to see the full error message
            logical_cell.elementary_cell_field_length = reader.uimsbf(8);
            // @ts-expect-error TS(2339): Property 'elementary_cell_fields' does not exist o... Remove this comment to see the full error message
            logical_cell.elementary_cell_fields = [];

            // @ts-expect-error TS(2339): Property 'elementary_cell_field_length' does not e... Remove this comment to see the full error message
            for (let j = 0; j < logical_cell.elementary_cell_field_length; j++) {
                let elementary_cell_field = {};

                reader.next(2);    // reserved_future_use
                // @ts-expect-error TS(2339): Property 'elementary_cell_id' does not exist on ty... Remove this comment to see the full error message
                elementary_cell_field.elementary_cell_id = reader.uimsbf(6);

                // @ts-expect-error TS(2339): Property 'elementary_cell_fields' does not exist o... Remove this comment to see the full error message
                logical_cell.elementary_cell_fields.push(elementary_cell_field);
            }

            // @ts-expect-error TS(2339): Property 'cell_linkage_info' does not exist on typ... Remove this comment to see the full error message
            logical_cell.cell_linkage_info = reader.uimsbf(8);

            // @ts-expect-error TS(2339): Property 'cell_linkage_info' does not exist on typ... Remove this comment to see the full error message
            if (logical_cell.cell_linkage_info === 0x01) {
                // @ts-expect-error TS(2339): Property 'bouquet_id' does not exist on type '{}'.
                logical_cell.bouquet_id = reader.uimsbf(16);
            }

            // @ts-expect-error TS(2339): Property 'cell_linkage_info' does not exist on typ... Remove this comment to see the full error message
            if (logical_cell.cell_linkage_info === 0x02) {
                // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
                logical_cell.original_network_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
                logical_cell.transport_stream_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
                logical_cell.service_id = reader.uimsbf(16);
            }

            // @ts-expect-error TS(2339): Property 'cell_linkage_info' does not exist on typ... Remove this comment to see the full error message
            if (logical_cell.cell_linkage_info === 0x03) {
                // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
                logical_cell.original_network_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
                logical_cell.transport_stream_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
                logical_cell.service_id = reader.uimsbf(16);
            }

            // @ts-expect-error TS(2339): Property 'cell_linkage_info' does not exist on typ... Remove this comment to see the full error message
            if (logical_cell.cell_linkage_info === 0x04) {
                // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
                logical_cell.original_network_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'transport_stream_id' does not exist on t... Remove this comment to see the full error message
                logical_cell.transport_stream_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'service_id' does not exist on type '{}'.
                logical_cell.service_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'event_id' does not exist on type '{}'.
                logical_cell.event_id = reader.uimsbf(16);
            }

            // @ts-expect-error TS(2339): Property 'logical_cells' does not exist on type '{... Remove this comment to see the full error message
            objDescriptor.logical_cells.push(logical_cell);
        }

        return objDescriptor;
    }
}

export default TsDescriptorMosaic;
