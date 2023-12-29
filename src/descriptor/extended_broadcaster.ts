import { Buffer } from "buffer";
import TsReader from "../reader";

class TsDescriptorExtendedBroadcaster {
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

        // @ts-expect-error TS(2339): Property 'broadcaster_type' does not exist on type... Remove this comment to see the full error message
        objDescriptor.broadcaster_type = reader.uimsbf(4);
        reader.next(4);    // reserved_future_use

        // @ts-expect-error TS(2339): Property 'broadcaster_type' does not exist on type... Remove this comment to see the full error message
        if (objDescriptor.broadcaster_type === 1) {
            // @ts-expect-error TS(2339): Property 'terrestrial_broadcaster_id' does not exi... Remove this comment to see the full error message
            objDescriptor.terrestrial_broadcaster_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'number_of_affiliation_id_loop' does not ... Remove this comment to see the full error message
            objDescriptor.number_of_affiliation_id_loop = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'number_of_broadcaster_id_loop' does not ... Remove this comment to see the full error message
            objDescriptor.number_of_broadcaster_id_loop = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'affiliations' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.affiliations = [];
            // @ts-expect-error TS(2339): Property 'broadcasters' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.broadcasters = [];

            // @ts-expect-error TS(2339): Property 'number_of_affiliation_id_loop' does not ... Remove this comment to see the full error message
            for (let i = 0; i < objDescriptor.number_of_affiliation_id_loop; i++) {
                let objAffiliation = {};

                // @ts-expect-error TS(2339): Property 'affiliation_id' does not exist on type '... Remove this comment to see the full error message
                objAffiliation.affiliation_id = reader.uimsbf(8);

                // @ts-expect-error TS(2339): Property 'affiliations' does not exist on type '{}... Remove this comment to see the full error message
                objDescriptor.affiliations.push(objAffiliation);
            }

            // @ts-expect-error TS(2339): Property 'number_of_broadcaster_id_loop' does not ... Remove this comment to see the full error message
            for (let i = 0; i < objDescriptor.number_of_broadcaster_id_loop; i++) {
                let objBroadcaster = {};

                // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
                objBroadcaster.original_network_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'broadcaster_id' does not exist on type '... Remove this comment to see the full error message
                objBroadcaster.broadcaster_id = reader.uimsbf(8);

                // @ts-expect-error TS(2339): Property 'broadcasters' does not exist on type '{}... Remove this comment to see the full error message
                objDescriptor.broadcasters.push(objBroadcaster);
            }
        // @ts-expect-error TS(2339): Property 'broadcaster_type' does not exist on type... Remove this comment to see the full error message
        } else if (objDescriptor.broadcaster_type === 2) {
            // @ts-expect-error TS(2339): Property 'terrestrial_sound_broadcaster_id' does n... Remove this comment to see the full error message
            objDescriptor.terrestrial_sound_broadcaster_id = reader.uimsbf(16);
            // @ts-expect-error TS(2339): Property 'number_of_sound_broadcast_affiliation_id... Remove this comment to see the full error message
            objDescriptor.number_of_sound_broadcast_affiliation_id_loop = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'number_of_broadcaster_id_loop' does not ... Remove this comment to see the full error message
            objDescriptor.number_of_broadcaster_id_loop = reader.uimsbf(4);
            // @ts-expect-error TS(2339): Property 'sound_broadcast_affiliations' does not e... Remove this comment to see the full error message
            objDescriptor.sound_broadcast_affiliations = [];
            // @ts-expect-error TS(2339): Property 'broadcasters' does not exist on type '{}... Remove this comment to see the full error message
            objDescriptor.broadcasters = [];

            // @ts-expect-error TS(2339): Property 'number_of_affiliation_id_loop' does not ... Remove this comment to see the full error message
            for (let i = 0; i < objDescriptor.number_of_affiliation_id_loop; i++) {
                let objSoundBroadcastAffiliation = {};

                // @ts-expect-error TS(2339): Property 'sound_broadcast_affiliation_id' does not... Remove this comment to see the full error message
                objSoundBroadcastAffiliation.sound_broadcast_affiliation_id = reader.uimsbf(8);

                // @ts-expect-error TS(2339): Property 'sound_broadcast_affiliations' does not e... Remove this comment to see the full error message
                objDescriptor.sound_broadcast_affiliations.push(objSoundBroadcastAffiliation);
            }

            // @ts-expect-error TS(2339): Property 'number_of_broadcaster_id_loop' does not ... Remove this comment to see the full error message
            for (let i = 0; i < objDescriptor.number_of_broadcaster_id_loop; i++) {
                let objBroadcaster = {};

                // @ts-expect-error TS(2339): Property 'original_network_id' does not exist on t... Remove this comment to see the full error message
                objBroadcaster.original_network_id = reader.uimsbf(16);
                // @ts-expect-error TS(2339): Property 'broadcaster_id' does not exist on type '... Remove this comment to see the full error message
                objBroadcaster.broadcaster_id = reader.uimsbf(8);

                // @ts-expect-error TS(2339): Property 'broadcasters' does not exist on type '{}... Remove this comment to see the full error message
                objDescriptor.broadcasters.push(objBroadcaster);
            }
        }

        return objDescriptor;
    }
}

export default TsDescriptorExtendedBroadcaster;
