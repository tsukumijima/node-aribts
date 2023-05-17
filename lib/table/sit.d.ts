export = TsTableSit;
declare class TsTableSit {
    constructor(buffer: any);
    buffer: any;
    decode(): {
        _raw: any;
        table_id: number;
        section_syntax_indicator: number;
        section_length: number;
        version_number: number;
        current_next_indicator: number;
        section_number: number;
        last_section_number: number;
        transmission_info_loop_length: number;
        transmission_info: ({
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            multiple_frame_rate_flag: number;
            frame_rate_code: number;
            MPEG_1_only_flag: number;
            constrained_parameter_flag: number;
            still_picture_flag: number;
            profile_and_level_indication: number;
            chroma_format: number;
            frame_rate_extension_flag: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            free_format_flag: number;
            ID: number;
            layer: number;
            variable_rate_audio_indicator: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            temporal_scalability_flag: number;
            spatial_scalability_flag: number;
            quality_scalability_flag: number;
            hierarchy_type: number;
            hierarchy_layer_index: number;
            tref_present_flag: number;
            hierarchy_embedded_layer_index: number;
            hierarchy_channel: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            format_identifier: number;
            additional_identification_info: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            alignment_type: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            horizontal_size: number;
            vertical_size: number;
            aspect_ratio_information: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            horizontal_offset: number;
            vertical_offset: number;
            window_priority: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CA_system_ID: number;
            CA_PID: number;
            private_data_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            ISO_639_languages: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            external_clock_reference_indicator: number;
            clock_accuracy_integer: number;
            clock_accuracy_exponent: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            bound_valid_flag: number;
            LTW_offset_lower_bound: number;
            LTW_offset_upper_bound: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            copyright_identifier: Buffer;
            additional_copyright_info: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            private_data_indicator: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            sb_leak_rate: number;
            sb_size: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            leak_valid_flag: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            closed_gop_flag: number;
            identical_gop_flag: number;
            max_gop_length: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            network_name_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            services: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            stuffing_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            frequency: number;
            orbital_position: number;
            west_east_flag: number;
            polarisation: number;
            modulation: number;
            symbol_rate: number;
            FEC_inner: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            frequency: number;
            frame_type: number;
            FEC_outer: number;
            modulation: number;
            symbol_rate: number;
            FEC_inner: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            bouquet_name_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            service_type: number;
            service_provider_name_length: number;
            service_provider_name_char: Buffer;
            service_name_length: number;
            service_name_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            country_availability_flag: number;
            country_availabilities: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            transport_stream_id: number;
            original_network_id: number;
            service_id: number;
            linkage_type: number;
            private_data_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            NVOD_references: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            reference_service_id: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            ISO_639_language_code: Buffer;
            event_name_length: number;
            event_name_char: Buffer;
            text_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            descriptor_number: number;
            last_descriptor_number: number;
            ISO_639_language_code: Buffer;
            length_of_items: number;
            items: any[];
            text_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            mosaic_entry_point: number;
            number_of_horizontal_elementary_cells: number;
            number_of_vertical_elementary_cells: number;
            logical_cells: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            component_tag: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CAs: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            contents: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            parental_ratings: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            local_time_offsets: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            peak_rate: number;
            minimum_overall_smoothing_rate: number;
            maximum_overall_smoothing_buffer: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            data_broadcast_id: number;
            id_selector_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            descriptor_number: number;
            last_descriptor_number: number;
            number_of_material_set: number;
            material_sets: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            quality_level: number;
            reference_PID: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            digital_recording_control_data: number;
            maximum_bitrate_flag: number;
            component_control_flag: number;
            user_defined: number;
            maximum_bitrate: number;
            component_control_length: number;
            component_controls: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            country_code: Buffer;
            media_type: number;
            network_id: number;
            private_data: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            event_version_number: number;
            event_start_time: Buffer;
            duration: Buffer;
            offset: Buffer;
            offset_flag: number;
            other_descriptor_status: number;
            jst_time_flag: number;
            jst_time: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            hyper_linkage_type: number;
            link_destination_type: number;
            selector_length: number;
            selector: Buffer;
            private_data: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            region_spec_type: number;
            target_region_spec: {
                prefecture_bitmap: Buffer;
            };
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            data_component_id: number;
            entry_component: number;
            selector_length: number;
            selector_byte: Buffer;
            num_of_component_ref: number;
            component_ref: Buffer;
            ISO_639_language_code: Buffer;
            text_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            still_picture_flag: number;
            sequence_end_code_flag: number;
            video_encode_format: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CA_system_id: number;
            transport_stream_id: number;
            original_network_id: number;
            power_supply_period: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CA_system_id: number;
            CA_unit_id: number;
            num_of_component: number;
            components: any[];
            contract_verification_info_length: number;
            contract_verification_info: Buffer;
            fee_name_length: number;
            fee_name: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            remote_control_key_id: number;
            length_of_ts_name: number;
            transmission_type_count: number;
            ts_name_char: Buffer;
            transmission_types: any[];
        } | {
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
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            logo_transmission_type: number;
            logo_id: number;
            logo_version: number;
            download_data_id: number;
            logo_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            segmentation_mode: number;
            segmentation_info_length: number;
            start_time_NPT: number;
            end_time_NPT: number;
            start_time: number;
            duration: number;
            start_time_extension: number;
            duration_extension: number;
            component_tags: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            information_provider_id: number;
            event_relation_id: number;
            references: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            reference_type: number;
            external_reference_flag: number;
            information_provider_id: number;
            event_relation_id: number;
            reference_node_id: number;
            reference_number: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            ISO_639_language_code: number;
            node_name_length: number;
            node_name_char: Buffer;
            text_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            external_event_flag: number;
            STC_reference_mode: number;
            external_event_id: number;
            external_service_id: number;
            external_network_id: number;
            NPT_reference: number;
            STC_reference: number;
            time_reference: number;
            time_reference_extention: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            series_id: number;
            repeat_label: number;
            program_pattern: number;
            expire_date_valid_flag: number;
            expire_date: number;
            episode_number: number;
            last_episode_number: number;
            series_name_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            group_type: number;
            event_count: number;
            events: any[];
            other_network_events: any[];
            private_data_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            parameter_version: number;
            update_time: number;
            table_descriptions: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            component_group_type: number;
            total_bit_rate_flag: number;
            num_of_group: number;
            groups: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            parameter_version: number;
            update_time: number;
            SI_prime_ts_network_id: number;
            SI_prime_transport_stream_id: number;
            tables: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            title_length: number;
            title_char: Buffer;
            text_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            original_service_id: number;
            transport_stream_id: number;
            original_network_id: number;
            descriptions: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            connected_transmission_group_id: number;
            segment_type: number;
            modulation_type_A: number;
            modulation_type_B: number;
            modulation_type_C: number;
            additional_connected_transmission_info: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            copy_restriction_mode: number;
            image_constraint_token: number;
            retention_mode: number;
            retention_state: number;
            encryption_mode: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            service_group_type: number;
            service_groups: any[];
            private_data_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            num_of_station_point: number;
            station_points: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            reboot: number;
            add_on: number;
            compatibility_flag: number;
            text_info_flag: number;
            component_size: number;
            session_protcol_number: number;
            session_id: number;
            retry: number;
            connect_timer: number;
            address_type: number;
            ipv4_address: any;
            port_number: number;
            ipv6_address: any;
            URL_length: number;
            URL_byte: any;
            compatibilityDescriptor: {
                _raw: any;
                compatibilityDescriptorLength: number;
                descriptorCount: number;
                descriptors: any[];
            };
            private_data_length: number;
            private_data_byte: Buffer;
            ISO_639_language_code: number;
            text_length: number;
            text_char: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            DL_system_ID: number;
            PID: number;
            encrypt_protocol_number: number;
            encrypt_info: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CA_system_ID: number;
            CA_program_ID: number;
            second_load_flag: number;
            load_indicator: number;
            exclusion_ID_num: number;
            exclusion_ID: any[];
            load_security_info_len: number;
            load_security_info_byte: Buffer;
            private_data_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            scramble_system_id: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            CA_system_id: number;
            transmission_type: number;
            PID: number;
            private_data_byte: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            sub_descriptors: ({
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                text_char: Buffer;
            } | {
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                position: number;
                moduleId: number;
            } | {
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                CRC_32: Buffer;
            } | {
                _raw: any;
                descriptor_tag: number;
                descriptor_length: number;
                descriptor: Buffer;
            })[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            conditional_playback_id: number;
            conditional_playback_PID: number;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            frequencies: any[];
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            data_component_id: number;
            additional_data_component_info: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            system_management_id: number;
            additional_identification_info: Buffer;
        } | {
            _raw: any;
            descriptor_tag: number;
            descriptor_length: number;
            descriptor: Buffer;
        })[];
        services: any[];
        CRC_32: Buffer;
    };
}
