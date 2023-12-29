"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
class TsDataModuleCdtLogo {
    buffer;
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new reader_1.default(this.buffer);
        let objDataModule = {};
        objDataModule.logo_type = reader.uimsbf(8);
        reader.next(7);
        objDataModule.logo_id = reader.uimsbf(9);
        reader.next(4);
        objDataModule.logo_version = reader.uimsbf(12);
        objDataModule.data_size = reader.uimsbf(16);
        objDataModule.data_byte = reader.readBytes(objDataModule.data_size);
        return objDataModule;
    }
}
exports.default = TsDataModuleCdtLogo;
//# sourceMappingURL=cdt_logo.js.map