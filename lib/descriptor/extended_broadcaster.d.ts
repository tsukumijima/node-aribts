export = TsDescriptorExtendedBroadcaster;
declare class TsDescriptorExtendedBroadcaster {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        broadcaster_type: number;
        terrestrial_broadcaster_id: number;
        number_of_affiliation_id_loop: number;
        number_of_broadcaster_id_loop: number;
        affiliations: any[];
        broadcasters: any[];
        terrestrial_sound_broadcaster_id: number;
        number_of_sound_broadcast_affiliation_id_loop: number;
        sound_broadcast_affiliations: any[];
    };
}
