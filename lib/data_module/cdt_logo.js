"use strict";
const TsReader = require("../reader");
class TsDataModuleCdtLogo {
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let reader = new TsReader(this.buffer);
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
module.exports = TsDataModuleCdtLogo;
//# sourceMappingURL=cdt_logo.js.map