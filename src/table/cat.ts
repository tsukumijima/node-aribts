import * as TsCrc32 from "../crc32";
import { Buffer } from "buffer";
import TsReader from "../reader";
import TsDescriptors from "../descriptors";

class TsTableCat {
    buffer: Buffer;
    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    decode() {
        if (TsCrc32.calc(this.buffer) !== 0) return null;

        let reader = new TsReader(this.buffer);
        let objCat: { [key: string]: any } = {};

        objCat._raw = this.buffer;

        objCat.table_id = reader.uimsbf(8);
        objCat.section_syntax_indicator = reader.bslbf(1);
        reader.next(1);    // '0'
        reader.next(2);    // reserved
        objCat.section_length = reader.uimsbf(12);
        reader.next(18);    // reserved
        objCat.version_number = reader.uimsbf(5);
        objCat.current_next_indicator = reader.bslbf(1);
        objCat.section_number = reader.uimsbf(8);
        objCat.last_section_number = reader.uimsbf(8);

        objCat.descriptors = new TsDescriptors(reader.readBytesRaw(3 + objCat.section_length - (reader.position >> 3) - 4)).decode();

        objCat.CRC_32 = reader.readBytes(4);

        return objCat;
    }
}

export default TsTableCat;
