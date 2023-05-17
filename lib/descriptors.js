"use strict";
const tsDescriptor = require("./descriptor");
class TsDescriptors {
    constructor(buffer) {
        this.buffer = buffer;
    }
    decode() {
        let arrDescriptors = [];
        for (let bytesRead = 0; bytesRead < this.buffer.length;) {
            let objDescriptor;
            let descriptorTag = this.buffer[bytesRead++];
            let descriptorLength = this.buffer[bytesRead++];
            let buffer = this.buffer.slice(bytesRead - 2, bytesRead + descriptorLength);
            bytesRead += descriptorLength;
            switch (descriptorTag) {
                case 0x00:
                case 0x01:
                    break;
                case 0x02:
                    objDescriptor = new tsDescriptor.TsDescriptorVideoStream(buffer).decode();
                    break;
                case 0x03:
                    objDescriptor = new tsDescriptor.TsDescriptorAudioStream(buffer).decode();
                    break;
                case 0x04:
                    objDescriptor = new tsDescriptor.TsDescriptorHierarchy(buffer).decode();
                    break;
                case 0x05:
                    objDescriptor = new tsDescriptor.TsDescriptorRegistration(buffer).decode();
                    break;
                case 0x06:
                    objDescriptor = new tsDescriptor.TsDescriptorDataStreamAlignment(buffer).decode();
                    break;
                case 0x07:
                    objDescriptor = new tsDescriptor.TsDescriptorTargetBackgroundGrid(buffer).decode();
                    break;
                case 0x08:
                    objDescriptor = new tsDescriptor.TsDescriptorVideoWindow(buffer).decode();
                    break;
                case 0x09:
                    objDescriptor = new tsDescriptor.TsDescriptorConditionalAccess(buffer).decode();
                    break;
                case 0x0A:
                    objDescriptor = new tsDescriptor.TsDescriptorIso639Language(buffer).decode();
                    break;
                case 0x0B:
                    objDescriptor = new tsDescriptor.TsDescriptorSystemClock(buffer).decode();
                    break;
                case 0x0C:
                    objDescriptor = new tsDescriptor.TsDescriptorMultiplexBufferUtilization(buffer).decode();
                    break;
                case 0x0D:
                    objDescriptor = new tsDescriptor.TsDescriptorCopyright(buffer).decode();
                    break;
                case 0x0F:
                    objDescriptor = new tsDescriptor.TsDescriptorPrivateDataIndicator(buffer).decode();
                    break;
                case 0x10:
                    objDescriptor = new tsDescriptor.TsDescriptorSmoothingBuffer(buffer).decode();
                    break;
                case 0x11:
                    objDescriptor = new tsDescriptor.TsDescriptorStd(buffer).decode();
                    break;
                case 0x12:
                    objDescriptor = new tsDescriptor.TsDescriptorIbp(buffer).decode();
                    break;
                case 0x40:
                    objDescriptor = new tsDescriptor.TsDescriptorNetworkName(buffer).decode();
                    break;
                case 0x41:
                    objDescriptor = new tsDescriptor.TsDescriptorServiceList(buffer).decode();
                    break;
                case 0x42:
                    objDescriptor = new tsDescriptor.TsDescriptorStuffing(buffer).decode();
                    break;
                case 0x43:
                    objDescriptor = new tsDescriptor.TsDescriptorSatelliteDeliverySystem(buffer).decode();
                    break;
                case 0x44:
                    objDescriptor = new tsDescriptor.TsDescriptorCableDeliverySystem(buffer).decode();
                    break;
                case 0x47:
                    objDescriptor = new tsDescriptor.TsDescriptorBouquetName(buffer).decode();
                    break;
                case 0x48:
                    objDescriptor = new tsDescriptor.TsDescriptorService(buffer).decode();
                    break;
                case 0x49:
                    objDescriptor = new tsDescriptor.TsDescriptorCountryAvailability(buffer).decode();
                    break;
                case 0x4A:
                    objDescriptor = new tsDescriptor.TsDescriptorLinkage(buffer).decode();
                    break;
                case 0x4B:
                    objDescriptor = new tsDescriptor.TsDescriptorNearVideoOnDemandReference(buffer).decode();
                    break;
                case 0x4C:
                    objDescriptor = new tsDescriptor.TsDescriptorTimeShiftedService(buffer).decode();
                    break;
                case 0x4D:
                    objDescriptor = new tsDescriptor.TsDescriptorShortEvent(buffer).decode();
                    break;
                case 0x4E:
                    objDescriptor = new tsDescriptor.TsDescriptorExtendedEvent(buffer).decode();
                    break;
                case 0x4F:
                    objDescriptor = new tsDescriptor.TsDescriptorTimeShiftedEvent(buffer).decode();
                    break;
                case 0x50:
                    objDescriptor = new tsDescriptor.TsDescriptorComponent(buffer).decode();
                    break;
                case 0x51:
                    objDescriptor = new tsDescriptor.TsDescriptorMosaic(buffer).decode();
                    break;
                case 0x52:
                    objDescriptor = new tsDescriptor.TsDescriptorStreamIdentifier(buffer).decode();
                    break;
                case 0x53:
                    objDescriptor = new tsDescriptor.TsDescriptorCaIdentifier(buffer).decode();
                    break;
                case 0x54:
                    objDescriptor = new tsDescriptor.TsDescriptorContent(buffer).decode();
                    break;
                case 0x55:
                    objDescriptor = new tsDescriptor.TsDescriptorParentalRating(buffer).decode();
                    break;
                case 0x58:
                    objDescriptor = new tsDescriptor.TsDescriptorLocalTimeOffset(buffer).decode();
                    break;
                case 0x63:
                    objDescriptor = new tsDescriptor.TsDescriptorPartialTransportStream(buffer).decode();
                    break;
                case 0x66:
                    objDescriptor = new tsDescriptor.TsDescriptorDataBroadcastId(buffer).decode();
                    break;
                case 0x67:
                    objDescriptor = new tsDescriptor.TsDescriptorMaterialInformation(buffer).decode();
                    break;
                case 0x68:
                    objDescriptor = new tsDescriptor.TsDescriptorHybridInformation(buffer).decode();
                    break;
                case 0xC0:
                    objDescriptor = new tsDescriptor.TsDescriptorHierarchicalTransmission(buffer).decode();
                    break;
                case 0xC1:
                    objDescriptor = new tsDescriptor.TsDescriptorDigitalCopyControl(buffer).decode();
                    break;
                case 0xC2:
                    objDescriptor = new tsDescriptor.TsDescriptorNetworkIdentification(buffer).decode();
                    break;
                case 0xC3:
                    objDescriptor = new tsDescriptor.TsDescriptorPartialTransportStreamTime(buffer).decode();
                    break;
                case 0xC4:
                    objDescriptor = new tsDescriptor.TsDescriptorAudioComponent(buffer).decode();
                    break;
                case 0xC5:
                    objDescriptor = new tsDescriptor.TsDescriptorHyperlink(buffer).decode();
                    break;
                case 0xC6:
                    objDescriptor = new tsDescriptor.TsDescriptorTargetRegion(buffer).decode();
                    break;
                case 0xC7:
                    objDescriptor = new tsDescriptor.TsDescriptorDataContent(buffer).decode();
                    break;
                case 0xC8:
                    objDescriptor = new tsDescriptor.TsDescriptorVideoDecodeControl(buffer).decode();
                    break;
                case 0xC9:
                    objDescriptor = new tsDescriptor.TsDescriptorDownloadContent(buffer).decode();
                    break;
                case 0xCA:
                    objDescriptor = new tsDescriptor.TsDescriptorCaEmmTs(buffer).decode();
                    break;
                case 0xCB:
                    objDescriptor = new tsDescriptor.TsDescriptorCaContractInfo(buffer).decode();
                    break;
                case 0xCC:
                    objDescriptor = new tsDescriptor.TsDescriptorCaService(buffer).decode();
                    break;
                case 0xCD:
                    objDescriptor = new tsDescriptor.TsDescriptorTsInformation(buffer).decode();
                    break;
                case 0xCE:
                    objDescriptor = new tsDescriptor.TsDescriptorExtendedBroadcaster(buffer).decode();
                    break;
                case 0xCF:
                    objDescriptor = new tsDescriptor.TsDescriptorLogoTransmission(buffer).decode();
                    break;
                case 0xD0:
                    objDescriptor = new tsDescriptor.TsDescriptorBasicLocalEvent(buffer).decode();
                    break;
                case 0xD1:
                    objDescriptor = new tsDescriptor.TsDescriptorReference(buffer).decode();
                    break;
                case 0xD2:
                    objDescriptor = new tsDescriptor.TsDescriptorNodeRelation(buffer).decode();
                    break;
                case 0xD3:
                    objDescriptor = new tsDescriptor.TsDescriptorShortNodeInformation(buffer).decode();
                    break;
                case 0xD4:
                    objDescriptor = new tsDescriptor.TsDescriptorStcReference(buffer).decode();
                    break;
                case 0xD5:
                    objDescriptor = new tsDescriptor.TsDescriptorSeries(buffer).decode();
                    break;
                case 0xD6:
                    objDescriptor = new tsDescriptor.TsDescriptorEventGroup(buffer).decode();
                    break;
                case 0xD7:
                    objDescriptor = new tsDescriptor.TsDescriptorSiParameter(buffer).decode();
                    break;
                case 0xD8:
                    objDescriptor = new tsDescriptor.TsDescriptorBroadcasterName(buffer).decode();
                    break;
                case 0xD9:
                    objDescriptor = new tsDescriptor.TsDescriptorComponentGroup(buffer).decode();
                    break;
                case 0xDA:
                    objDescriptor = new tsDescriptor.TsDescriptorSiPrimeTs(buffer).decode();
                    break;
                case 0xDB:
                    objDescriptor = new tsDescriptor.TsDescriptorBoardInformation(buffer).decode();
                    break;
                case 0xDC:
                    objDescriptor = new tsDescriptor.TsDescriptorLdtLinkage(buffer).decode();
                    break;
                case 0xDD:
                    objDescriptor = new tsDescriptor.TsDescriptorConnectedTransmission(buffer).decode();
                    break;
                case 0xDE:
                    objDescriptor = new tsDescriptor.TsDescriptorContentAvailability(buffer).decode();
                    break;
                case 0xDF:
                    break;
                case 0xE0:
                    objDescriptor = new tsDescriptor.TsDescriptorServiceGroup(buffer).decode();
                    break;
                case 0xE1:
                    objDescriptor = new tsDescriptor.TsDescriptorAreaBroadcastingInformation(buffer).decode();
                    break;
                case 0xE2:
                    objDescriptor = new tsDescriptor.TsDescriptorNetworkDownloadContent(buffer).decode();
                    break;
                case 0xE3:
                    objDescriptor = new tsDescriptor.TsDescriptorDlProtection(buffer).decode();
                    break;
                case 0xE4:
                    objDescriptor = new tsDescriptor.TsDescriptorCaStartup(buffer).decode();
                    break;
                case 0xF3:
                    objDescriptor = new tsDescriptor.TsDescriptorCableMulticarrierTransmissionDeliverySystem(buffer).decode();
                    break;
                case 0xF4:
                    objDescriptor = new tsDescriptor.TsDescriptorAdvancedCableDeliverySystem(buffer).decode();
                    break;
                case 0xF5:
                    objDescriptor = new tsDescriptor.TsDescriptorScrambleSystem(buffer).decode();
                    break;
                case 0xF6:
                    objDescriptor = new tsDescriptor.TsDescriptorAccessControl(buffer).decode();
                    break;
                case 0xF7:
                    objDescriptor = new tsDescriptor.TsDescriptorCarouselCompatibleComposite(buffer).decode();
                    break;
                case 0xF8:
                    objDescriptor = new tsDescriptor.TsDescriptorConditionalPlayback(buffer).decode();
                    break;
                case 0xF9:
                    objDescriptor = new tsDescriptor.TsDescriptorCableTsDivisionSystem(buffer).decode();
                    break;
                case 0xFA:
                    objDescriptor = new tsDescriptor.TsDescriptorTerrestrialDeliverySystem(buffer).decode();
                    break;
                case 0xFB:
                    objDescriptor = new tsDescriptor.TsDescriptorPartialReception(buffer).decode();
                    break;
                case 0xFC:
                    objDescriptor = new tsDescriptor.TsDescriptorEmergencyInformation(buffer).decode();
                    break;
                case 0xFD:
                    objDescriptor = new tsDescriptor.TsDescriptorDataComponent(buffer).decode();
                    break;
                case 0xFE:
                    objDescriptor = new tsDescriptor.TsDescriptorSystemManagement(buffer).decode();
                    break;
                default:
                    objDescriptor = new tsDescriptor.TsDescriptorUnknown(buffer).decode();
            }
            arrDescriptors.push(objDescriptor);
        }
        return arrDescriptors;
    }
}
module.exports = TsDescriptors;
//# sourceMappingURL=descriptors.js.map