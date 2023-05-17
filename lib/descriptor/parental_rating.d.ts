export = TsDescriptorParentalRating;
declare class TsDescriptorParentalRating {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        descriptor_tag: number;
        descriptor_length: number;
        parental_ratings: any[];
    };
}
