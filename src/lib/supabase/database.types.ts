export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admissions: {
        Row: {
          admission_type: string
          admitted_on: string | null
          an: string
          bed_name: string | null
          created_at: string | null
          department: string | null
          discharged_on: string | null
          discount: number | null
          doctor_id: number | null
          id: number
          item_total: number | null
          net_bill: number | null
          notes: string | null
          patient_id: number
          patient_type: string | null
          referred_by_id: number | null
          service_charge: number | null
          status: string | null
          total_bill: number | null
          total_collected: number | null
          total_due: number | null
          total_refund: number | null
          total_vat: number | null
          updated_at: string | null
          urgent_fee: number | null
          ward_name: string | null
        }
        Insert: {
          admission_type: string
          admitted_on?: string | null
          an: string
          bed_name?: string | null
          created_at?: string | null
          department?: string | null
          discharged_on?: string | null
          discount?: number | null
          doctor_id?: number | null
          id?: number
          item_total?: number | null
          net_bill?: number | null
          notes?: string | null
          patient_id: number
          patient_type?: string | null
          referred_by_id?: number | null
          service_charge?: number | null
          status?: string | null
          total_bill?: number | null
          total_collected?: number | null
          total_due?: number | null
          total_refund?: number | null
          total_vat?: number | null
          updated_at?: string | null
          urgent_fee?: number | null
          ward_name?: string | null
        }
        Update: {
          admission_type?: string
          admitted_on?: string | null
          an?: string
          bed_name?: string | null
          created_at?: string | null
          department?: string | null
          discharged_on?: string | null
          discount?: number | null
          doctor_id?: number | null
          id?: number
          item_total?: number | null
          net_bill?: number | null
          notes?: string | null
          patient_id?: number
          patient_type?: string | null
          referred_by_id?: number | null
          service_charge?: number | null
          status?: string | null
          total_bill?: number | null
          total_collected?: number | null
          total_due?: number | null
          total_refund?: number | null
          total_vat?: number | null
          updated_at?: string | null
          urgent_fee?: number | null
          ward_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admissions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
        ]
      }
      agent_schedules: {
        Row: {
          agent_name: string
          created_at: string
          day_of_week: number
          id: number
          is_active: boolean
        }
        Insert: {
          agent_name: string
          created_at?: string
          day_of_week: number
          id?: never
          is_active?: boolean
        }
        Update: {
          agent_name?: string
          created_at?: string
          day_of_week?: number
          id?: never
          is_active?: boolean
        }
        Relationships: []
      }
      agents: {
        Row: {
          active: boolean | null
          agent_name: string
          created_at: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          agent_name: string
          created_at?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          agent_name?: string
          created_at?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      appointment_confirmation_calls: {
        Row: {
          agent_name: string
          appointment_id: number
          attempt_number: number
          call_type: string
          called_at: string
          created_at: string
          id: number
          notes: string | null
          outcome: string
          patient_id: number | null
        }
        Insert: {
          agent_name: string
          appointment_id: number
          attempt_number?: number
          call_type: string
          called_at?: string
          created_at?: string
          id?: never
          notes?: string | null
          outcome: string
          patient_id?: number | null
        }
        Update: {
          agent_name?: string
          appointment_id?: number
          attempt_number?: number
          call_type?: string
          called_at?: string
          created_at?: string
          id?: never
          notes?: string | null
          outcome?: string
          patient_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_confirmation_calls_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      appointment_events: {
        Row: {
          agent_name: string | null
          appointment_id: number
          created_at: string
          event_type: string
          id: number
          new_value: string | null
          notes: string | null
          old_value: string | null
          patient_id: number | null
        }
        Insert: {
          agent_name?: string | null
          appointment_id: number
          created_at?: string
          event_type: string
          id?: never
          new_value?: string | null
          notes?: string | null
          old_value?: string | null
          patient_id?: number | null
        }
        Update: {
          agent_name?: string | null
          appointment_id?: number
          created_at?: string
          event_type?: string
          id?: never
          new_value?: string | null
          notes?: string | null
          old_value?: string | null
          patient_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "appointment_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      archived_call_interactions: {
        Row: {
          agent_name: string | null
          appointment_id: number | null
          call_completed_at: string | null
          callback_task_id: string | null
          created_at: string | null
          data_quality_notes: string | null
          followup_number: number | null
          id: string
          last_matched_at: string | null
          lead_id: number | null
          linked_admission_id: number | null
          matched_confidence: number | null
          matched_method: string | null
          needs_review: boolean
          next_followup_at: string | null
          notes: string | null
          outcome: string | null
          patient_id: number | null
        }
        Insert: {
          agent_name?: string | null
          appointment_id?: number | null
          call_completed_at?: string | null
          callback_task_id?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          followup_number?: number | null
          id?: string
          last_matched_at?: string | null
          lead_id?: number | null
          linked_admission_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          needs_review?: boolean
          next_followup_at?: string | null
          notes?: string | null
          outcome?: string | null
          patient_id?: number | null
        }
        Update: {
          agent_name?: string | null
          appointment_id?: number | null
          call_completed_at?: string | null
          callback_task_id?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          followup_number?: number | null
          id?: string
          last_matched_at?: string | null
          lead_id?: number | null
          linked_admission_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          needs_review?: boolean
          next_followup_at?: string | null
          notes?: string | null
          outcome?: string | null
          patient_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_callback_task_id_fkey"
            columns: ["callback_task_id"]
            isOneToOne: false
            referencedRelation: "callback_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_interactions_callback_task_id_fkey"
            columns: ["callback_task_id"]
            isOneToOne: false
            referencedRelation: "daily_callback_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_interactions_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_interactions_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      archived_discounts: {
        Row: {
          admission_id: number
          amount: number
          approved_by: string | null
          created_at: string | null
          discount_date: string | null
          discount_type: string | null
          id: number
          notes: string | null
        }
        Insert: {
          admission_id: number
          amount: number
          approved_by?: string | null
          created_at?: string | null
          discount_date?: string | null
          discount_type?: string | null
          id?: number
          notes?: string | null
        }
        Update: {
          admission_id?: number
          amount?: number
          approved_by?: string | null
          created_at?: string | null
          discount_date?: string | null
          discount_type?: string | null
          id?: number
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
        ]
      }
      archived_payments: {
        Row: {
          admission_id: number
          amount: number
          collector: string | null
          created_at: string | null
          id: number
          notes: string | null
          pay_date: string
          pay_no: string | null
          pay_type: string
        }
        Insert: {
          admission_id: number
          amount: number
          collector?: string | null
          created_at?: string | null
          id?: number
          notes?: string | null
          pay_date: string
          pay_no?: string | null
          pay_type: string
        }
        Update: {
          admission_id?: number
          amount?: number
          collector?: string | null
          created_at?: string | null
          id?: number
          notes?: string | null
          pay_date?: string
          pay_no?: string | null
          pay_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
        ]
      }
      bill_line_item_category_audit: {
        Row: {
          bill_line_item_id: number
          changed_at: string
          id: number
          new_category_id: number | null
          old_category_id: number | null
          particulars: string | null
          rule_applied: string | null
        }
        Insert: {
          bill_line_item_id: number
          changed_at?: string
          id?: number
          new_category_id?: number | null
          old_category_id?: number | null
          particulars?: string | null
          rule_applied?: string | null
        }
        Update: {
          bill_line_item_id?: number
          changed_at?: string
          id?: number
          new_category_id?: number | null
          old_category_id?: number | null
          particulars?: string | null
          rule_applied?: string | null
        }
        Relationships: []
      }
      bill_line_items: {
        Row: {
          admission_id: number
          amount: number
          category_id: number | null
          created_at: string | null
          id: number
          line_date: string | null
          particulars: string
          qty: number
          rate: number
          service_charge_amt: number | null
        }
        Insert: {
          admission_id: number
          amount?: number
          category_id?: number | null
          created_at?: string | null
          id?: number
          line_date?: string | null
          particulars: string
          qty?: number
          rate?: number
          service_charge_amt?: number | null
        }
        Update: {
          admission_id?: number
          amount?: number
          category_id?: number | null
          created_at?: string | null
          id?: number
          line_date?: string | null
          particulars?: string
          qty?: number
          rate?: number
          service_charge_amt?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bill_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bill_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "bill_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "bill_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "bill_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "bill_line_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      call_center_followups: {
        Row: {
          call_status: string | null
          created_at: string | null
          data_quality_notes: string | null
          feedback_1: string | null
          feedback_1_date: string | null
          feedback_1_person: string | null
          feedback_2: string | null
          feedback_2_date: string | null
          feedback_2_person: string | null
          feedback_3: string | null
          feedback_3_date: string | null
          feedback_3_person: string | null
          followup_date: string | null
          id: number
          last_matched_at: string | null
          linked_admission_id: number | null
          location: string | null
          log_id: number | null
          matched_confidence: number | null
          matched_method: string | null
          matched_patient_id: number | null
          mobile_e164: string | null
          mobile_normalised: string | null
          mobile_raw: string | null
          needs_review: boolean
          patient_name: string | null
          patient_status: string | null
          previous_feedback: string | null
          remarks: string | null
          serial_no: number | null
          updated_at: string | null
        }
        Insert: {
          call_status?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          feedback_1?: string | null
          feedback_1_date?: string | null
          feedback_1_person?: string | null
          feedback_2?: string | null
          feedback_2_date?: string | null
          feedback_2_person?: string | null
          feedback_3?: string | null
          feedback_3_date?: string | null
          feedback_3_person?: string | null
          followup_date?: string | null
          id?: number
          last_matched_at?: string | null
          linked_admission_id?: number | null
          location?: string | null
          log_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          mobile_e164?: string | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_review?: boolean
          patient_name?: string | null
          patient_status?: string | null
          previous_feedback?: string | null
          remarks?: string | null
          serial_no?: number | null
          updated_at?: string | null
        }
        Update: {
          call_status?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          feedback_1?: string | null
          feedback_1_date?: string | null
          feedback_1_person?: string | null
          feedback_2?: string | null
          feedback_2_date?: string | null
          feedback_2_person?: string | null
          feedback_3?: string | null
          feedback_3_date?: string | null
          feedback_3_person?: string | null
          followup_date?: string | null
          id?: number
          last_matched_at?: string | null
          linked_admission_id?: number | null
          location?: string | null
          log_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          mobile_e164?: string | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_review?: boolean
          patient_name?: string | null
          patient_status?: string | null
          previous_feedback?: string | null
          remarks?: string | null
          serial_no?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_center_followups_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_followups_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_followups_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_followups_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_followups_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_followups_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_followups_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      call_center_logs: {
        Row: {
          ad_campaign: string | null
          appointment_date: string | null
          appointment_datetime: string | null
          appointment_final_status: string | null
          appointment_status: string | null
          appointment_time: string | null
          assigned_agent: string | null
          call_category: string | null
          call_center_person: string | null
          call_source: string | null
          comments: string | null
          created_at: string | null
          data_quality_notes: string | null
          doctor_id: number | null
          doctor_name_raw: string | null
          eligible_for_meta_export: boolean
          followup_count: number | null
          followup_notes: string | null
          followup_required: boolean | null
          id: number
          internal_lead_category: string | null
          last_call_outcome: string | null
          last_followup_date: string | null
          last_matched_at: string | null
          lead_category: string | null
          lead_source: string | null
          link_method: string | null
          linked_admission_id: number | null
          linked_at: string | null
          location: string | null
          log_date: string | null
          matched_confidence: number | null
          matched_method: string | null
          matched_patient_id: number | null
          max_followups: number | null
          meta_export_exclusion_reason: string | null
          meta_route: string | null
          mobile_e164: string | null
          mobile_normalised: string | null
          mobile_raw: string | null
          needs_doctor_callback: boolean | null
          needs_review: boolean | null
          next_followup_date: string | null
          patient_age: string | null
          patient_id: number | null
          patient_id_raw: string | null
          patient_name: string | null
          patient_type: string | null
          priority: string | null
          revenue_to_date: number | null
          serial_no: number | null
          sheet_tab: string
          updated_at: string | null
        }
        Insert: {
          ad_campaign?: string | null
          appointment_date?: string | null
          appointment_datetime?: string | null
          appointment_final_status?: string | null
          appointment_status?: string | null
          appointment_time?: string | null
          assigned_agent?: string | null
          call_category?: string | null
          call_center_person?: string | null
          call_source?: string | null
          comments?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          doctor_id?: number | null
          doctor_name_raw?: string | null
          eligible_for_meta_export?: boolean
          followup_count?: number | null
          followup_notes?: string | null
          followup_required?: boolean | null
          id?: number
          internal_lead_category?: string | null
          last_call_outcome?: string | null
          last_followup_date?: string | null
          last_matched_at?: string | null
          lead_category?: string | null
          lead_source?: string | null
          link_method?: string | null
          linked_admission_id?: number | null
          linked_at?: string | null
          location?: string | null
          log_date?: string | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          max_followups?: number | null
          meta_export_exclusion_reason?: string | null
          meta_route?: string | null
          mobile_e164?: string | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_doctor_callback?: boolean | null
          needs_review?: boolean | null
          next_followup_date?: string | null
          patient_age?: string | null
          patient_id?: number | null
          patient_id_raw?: string | null
          patient_name?: string | null
          patient_type?: string | null
          priority?: string | null
          revenue_to_date?: number | null
          serial_no?: number | null
          sheet_tab?: string
          updated_at?: string | null
        }
        Update: {
          ad_campaign?: string | null
          appointment_date?: string | null
          appointment_datetime?: string | null
          appointment_final_status?: string | null
          appointment_status?: string | null
          appointment_time?: string | null
          assigned_agent?: string | null
          call_category?: string | null
          call_center_person?: string | null
          call_source?: string | null
          comments?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          doctor_id?: number | null
          doctor_name_raw?: string | null
          eligible_for_meta_export?: boolean
          followup_count?: number | null
          followup_notes?: string | null
          followup_required?: boolean | null
          id?: number
          internal_lead_category?: string | null
          last_call_outcome?: string | null
          last_followup_date?: string | null
          last_matched_at?: string | null
          lead_category?: string | null
          lead_source?: string | null
          link_method?: string | null
          linked_admission_id?: number | null
          linked_at?: string | null
          location?: string | null
          log_date?: string | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          max_followups?: number | null
          meta_export_exclusion_reason?: string | null
          meta_route?: string | null
          mobile_e164?: string | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_doctor_callback?: boolean | null
          needs_review?: boolean | null
          next_followup_date?: string | null
          patient_age?: string | null
          patient_id?: number | null
          patient_id_raw?: string | null
          patient_name?: string | null
          patient_type?: string | null
          priority?: string | null
          revenue_to_date?: number | null
          serial_no?: number | null
          sheet_tab?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_center_logs_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_logs_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      call_center_patient_feedback: {
        Row: {
          comments: string | null
          created_at: string | null
          data_quality_notes: string | null
          doctor_id: number | null
          doctor_name_raw: string | null
          feedback_date: string | null
          id: number
          indication: string | null
          last_matched_at: string | null
          linked_admission_id: number | null
          matched_confidence: number | null
          matched_method: string | null
          matched_patient_id: number | null
          mobile_normalised: string | null
          mobile_raw: string | null
          needs_review: boolean
          patient_id: number | null
          patient_id_raw: string | null
          patient_name: string | null
          remarks: string | null
          serial_no: number | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          doctor_id?: number | null
          doctor_name_raw?: string | null
          feedback_date?: string | null
          id?: number
          indication?: string | null
          last_matched_at?: string | null
          linked_admission_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_review?: boolean
          patient_id?: number | null
          patient_id_raw?: string | null
          patient_name?: string | null
          remarks?: string | null
          serial_no?: number | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          doctor_id?: number | null
          doctor_name_raw?: string | null
          feedback_date?: string | null
          id?: number
          indication?: string | null
          last_matched_at?: string | null
          linked_admission_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_review?: boolean
          patient_id?: number | null
          patient_id_raw?: string | null
          patient_name?: string | null
          remarks?: string | null
          serial_no?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "call_center_patient_feedback_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_patient_feedback_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      call_center_screening: {
        Row: {
          ad_campaign: string | null
          appointment_datetime: string | null
          appointment_status: string | null
          call_category: string | null
          comments: string | null
          created_at: string | null
          data_quality_notes: string | null
          doctor_id: number | null
          doctor_name_raw: string | null
          followup_call: string | null
          id: number
          last_matched_at: string | null
          linked_admission_id: number | null
          location: string | null
          log_id: number | null
          matched_confidence: number | null
          matched_method: string | null
          matched_patient_id: number | null
          mobile_e164: string | null
          mobile_normalised: string | null
          mobile_raw: string | null
          needs_review: boolean
          patient_name: string | null
          patient_type: string | null
          reason_no_therapy: string | null
          screening_date: string | null
          serial_no: number | null
          took_therapy: boolean | null
          visit_status: string | null
          which_therapy: string | null
        }
        Insert: {
          ad_campaign?: string | null
          appointment_datetime?: string | null
          appointment_status?: string | null
          call_category?: string | null
          comments?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          doctor_id?: number | null
          doctor_name_raw?: string | null
          followup_call?: string | null
          id?: number
          last_matched_at?: string | null
          linked_admission_id?: number | null
          location?: string | null
          log_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          mobile_e164?: string | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_review?: boolean
          patient_name?: string | null
          patient_type?: string | null
          reason_no_therapy?: string | null
          screening_date?: string | null
          serial_no?: number | null
          took_therapy?: boolean | null
          visit_status?: string | null
          which_therapy?: string | null
        }
        Update: {
          ad_campaign?: string | null
          appointment_datetime?: string | null
          appointment_status?: string | null
          call_category?: string | null
          comments?: string | null
          created_at?: string | null
          data_quality_notes?: string | null
          doctor_id?: number | null
          doctor_name_raw?: string | null
          followup_call?: string | null
          id?: number
          last_matched_at?: string | null
          linked_admission_id?: number | null
          location?: string | null
          log_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          matched_patient_id?: number | null
          mobile_e164?: string | null
          mobile_normalised?: string | null
          mobile_raw?: string | null
          needs_review?: boolean
          patient_name?: string | null
          patient_type?: string | null
          reason_no_therapy?: string | null
          screening_date?: string | null
          serial_no?: number | null
          took_therapy?: boolean | null
          visit_status?: string | null
          which_therapy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_center_screening_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_screening_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "call_center_screening_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_screening_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_screening_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_screening_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_screening_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_screening_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "call_center_screening_matched_patient_id_fkey"
            columns: ["matched_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      callback_tasks: {
        Row: {
          appointment_id: number | null
          assigned_to: string | null
          closed_at: string | null
          closed_reason: string | null
          completed_followups: number | null
          created_at: string | null
          data_quality_notes: string | null
          due_at: string | null
          followup_number: number | null
          id: string
          last_called_at: string | null
          last_matched_at: string | null
          last_outcome: string | null
          lead_category: string | null
          lead_id: number | null
          linked_admission_id: number | null
          matched_confidence: number | null
          matched_method: string | null
          max_followups: number | null
          needs_review: boolean
          next_followup_at: string | null
          normalized_phone: string | null
          patient_id: number | null
          patient_name: string | null
          phone: string | null
          priority_label: string | null
          priority_rank: number | null
          reason: string | null
          relevant_date: string | null
          source: string | null
          source_of_appointment: string | null
          status: string | null
          task_type: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: number | null
          assigned_to?: string | null
          closed_at?: string | null
          closed_reason?: string | null
          completed_followups?: number | null
          created_at?: string | null
          data_quality_notes?: string | null
          due_at?: string | null
          followup_number?: number | null
          id?: string
          last_called_at?: string | null
          last_matched_at?: string | null
          last_outcome?: string | null
          lead_category?: string | null
          lead_id?: number | null
          linked_admission_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          max_followups?: number | null
          needs_review?: boolean
          next_followup_at?: string | null
          normalized_phone?: string | null
          patient_id?: number | null
          patient_name?: string | null
          phone?: string | null
          priority_label?: string | null
          priority_rank?: number | null
          reason?: string | null
          relevant_date?: string | null
          source?: string | null
          source_of_appointment?: string | null
          status?: string | null
          task_type?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: number | null
          assigned_to?: string | null
          closed_at?: string | null
          closed_reason?: string | null
          completed_followups?: number | null
          created_at?: string | null
          data_quality_notes?: string | null
          due_at?: string | null
          followup_number?: number | null
          id?: string
          last_called_at?: string | null
          last_matched_at?: string | null
          last_outcome?: string | null
          lead_category?: string | null
          lead_id?: number | null
          linked_admission_id?: number | null
          matched_confidence?: number | null
          matched_method?: string | null
          max_followups?: number | null
          needs_review?: boolean
          next_followup_at?: string | null
          normalized_phone?: string | null
          patient_id?: number | null
          patient_name?: string | null
          phone?: string | null
          priority_label?: string | null
          priority_rank?: number | null
          reason?: string | null
          relevant_date?: string | null
          source?: string | null
          source_of_appointment?: string | null
          status?: string | null
          task_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      competitor_ad_intelligence: {
        Row: {
          ad_library_url: string | null
          competitor_name: string
          created_at: string | null
          creative_format: string | null
          cta: string | null
          first_seen_date: string | null
          hook: string | null
          id: string
          language_style: string | null
          last_seen_date: string | null
          notes: string | null
          offer_type: string | null
          page_name: string | null
          platform: string | null
          screenshot_url: string | null
          service_line: string | null
          trust_signal: string | null
          updated_at: string | null
        }
        Insert: {
          ad_library_url?: string | null
          competitor_name: string
          created_at?: string | null
          creative_format?: string | null
          cta?: string | null
          first_seen_date?: string | null
          hook?: string | null
          id?: string
          language_style?: string | null
          last_seen_date?: string | null
          notes?: string | null
          offer_type?: string | null
          page_name?: string | null
          platform?: string | null
          screenshot_url?: string | null
          service_line?: string | null
          trust_signal?: string | null
          updated_at?: string | null
        }
        Update: {
          ad_library_url?: string | null
          competitor_name?: string
          created_at?: string | null
          creative_format?: string | null
          cta?: string | null
          first_seen_date?: string | null
          hook?: string | null
          id?: string
          language_style?: string | null
          last_seen_date?: string | null
          notes?: string | null
          offer_type?: string | null
          page_name?: string | null
          platform?: string | null
          screenshot_url?: string | null
          service_line?: string | null
          trust_signal?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      crm_appointments: {
        Row: {
          appointment_date: string | null
          appointment_status: string | null
          appointment_time: string | null
          appointment_type: string | null
          confirmation_status: string | null
          created_at: string | null
          created_by: string | null
          doctor_id: number | null
          doctor_service: string | null
          external_appointment_id: string | null
          id: number
          lead_id: number | null
          morning_of_status: string | null
          night_before_status: string | null
          no_show_risk: string | null
          notes: string | null
          patient_id: number | null
          previous_appointment_id: number | null
          rescheduled_to_appointment_id: number | null
          source_system: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          appointment_date?: string | null
          appointment_status?: string | null
          appointment_time?: string | null
          appointment_type?: string | null
          confirmation_status?: string | null
          created_at?: string | null
          created_by?: string | null
          doctor_id?: number | null
          doctor_service?: string | null
          external_appointment_id?: string | null
          id?: number
          lead_id?: number | null
          morning_of_status?: string | null
          night_before_status?: string | null
          no_show_risk?: string | null
          notes?: string | null
          patient_id?: number | null
          previous_appointment_id?: number | null
          rescheduled_to_appointment_id?: number | null
          source_system?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          appointment_date?: string | null
          appointment_status?: string | null
          appointment_time?: string | null
          appointment_type?: string | null
          confirmation_status?: string | null
          created_at?: string | null
          created_by?: string | null
          doctor_id?: number | null
          doctor_service?: string | null
          external_appointment_id?: string | null
          id?: number
          lead_id?: number | null
          morning_of_status?: string | null
          night_before_status?: string | null
          no_show_risk?: string | null
          notes?: string | null
          patient_id?: number | null
          previous_appointment_id?: number | null
          rescheduled_to_appointment_id?: number | null
          source_system?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "crm_appointments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_previous_appointment_id_fkey"
            columns: ["previous_appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_appointments_rescheduled_to_appointment_id_fkey"
            columns: ["rescheduled_to_appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
        ]
      }
      crm_billing_links: {
        Row: {
          admission_id: number | null
          attributed_line_item_revenue: number
          attributed_revenue: number
          attribution_window_days: number | null
          created_at: string
          id: number
          invoice_date: string | null
          invoice_id: number
          match_confidence: number | null
          match_method: string
          patient_id: number | null
          source_event_date: string | null
          source_record_id: string
          source_table: string
          updated_at: string
        }
        Insert: {
          admission_id?: number | null
          attributed_line_item_revenue?: number
          attributed_revenue?: number
          attribution_window_days?: number | null
          created_at?: string
          id?: number
          invoice_date?: string | null
          invoice_id: number
          match_confidence?: number | null
          match_method: string
          patient_id?: number | null
          source_event_date?: string | null
          source_record_id: string
          source_table: string
          updated_at?: string
        }
        Update: {
          admission_id?: number | null
          attributed_line_item_revenue?: number
          attributed_revenue?: number
          attribution_window_days?: number | null
          created_at?: string
          id?: number
          invoice_date?: string | null
          invoice_id?: number
          match_confidence?: number | null
          match_method?: string
          patient_id?: number | null
          source_event_date?: string | null
          source_record_id?: string
          source_table?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_billing_links_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_billing_links_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_billing_links_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_billing_links_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_billing_links_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_billing_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_billing_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "crm_billing_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "crm_billing_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "crm_billing_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_validation_status"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "crm_billing_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "vw_finance_invoice_summary"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_billing_links_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      crm_call_interactions: {
        Row: {
          agent_name: string | null
          appointment_id: number | null
          call_direction: string | null
          call_ended_at: string | null
          call_outcome: string | null
          call_started_at: string | null
          call_status: string | null
          channel: string | null
          created_at: string | null
          duration_seconds: number | null
          external_call_id: string | null
          follow_up_id: number | null
          id: number
          lead_id: number | null
          next_action: string | null
          patient_id: number | null
          phone_normalized: string | null
          recording_url: string | null
          source_system: string | null
          summary: string | null
          transcript_url: string | null
          updated_at: string | null
        }
        Insert: {
          agent_name?: string | null
          appointment_id?: number | null
          call_direction?: string | null
          call_ended_at?: string | null
          call_outcome?: string | null
          call_started_at?: string | null
          call_status?: string | null
          channel?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          external_call_id?: string | null
          follow_up_id?: number | null
          id?: number
          lead_id?: number | null
          next_action?: string | null
          patient_id?: number | null
          phone_normalized?: string | null
          recording_url?: string | null
          source_system?: string | null
          summary?: string | null
          transcript_url?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_name?: string | null
          appointment_id?: number | null
          call_direction?: string | null
          call_ended_at?: string | null
          call_outcome?: string | null
          call_started_at?: string | null
          call_status?: string | null
          channel?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          external_call_id?: string | null
          follow_up_id?: number | null
          id?: number
          lead_id?: number | null
          next_action?: string | null
          patient_id?: number | null
          phone_normalized?: string | null
          recording_url?: string | null
          source_system?: string | null
          summary?: string | null
          transcript_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_follow_up_id_fkey"
            columns: ["follow_up_id"]
            isOneToOne: false
            referencedRelation: "crm_follow_ups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_call_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_call_interactions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      crm_follow_ups: {
        Row: {
          agent_name: string | null
          appointment_id: number | null
          call_date: string | null
          created_at: string | null
          due_at: string | null
          follow_up_number: number | null
          id: number
          next_follow_up_date: string | null
          notes: string | null
          outcome: string | null
          patient_id: number | null
          source_system: string | null
          updated_at: string | null
        }
        Insert: {
          agent_name?: string | null
          appointment_id?: number | null
          call_date?: string | null
          created_at?: string | null
          due_at?: string | null
          follow_up_number?: number | null
          id?: number
          next_follow_up_date?: string | null
          notes?: string | null
          outcome?: string | null
          patient_id?: number | null
          source_system?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_name?: string | null
          appointment_id?: number | null
          call_date?: string | null
          created_at?: string | null
          due_at?: string | null
          follow_up_number?: number | null
          id?: number
          next_follow_up_date?: string | null
          notes?: string | null
          outcome?: string | null
          patient_id?: number | null
          source_system?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      crm_invoice_reconciliation: {
        Row: {
          admission_id: number | null
          attribution_type: string
          created_at: string
          created_by_run_id: number | null
          crm_appointment_date: string | null
          crm_log_date: string | null
          crm_log_id: number | null
          id: number
          invoice_date: string | null
          invoice_no: string | null
          match_confidence: number
          match_method: string
          match_status: string
          patient_id: number | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          source_truth: string
          updated_at: string
        }
        Insert: {
          admission_id?: number | null
          attribution_type?: string
          created_at?: string
          created_by_run_id?: number | null
          crm_appointment_date?: string | null
          crm_log_date?: string | null
          crm_log_id?: number | null
          id?: number
          invoice_date?: string | null
          invoice_no?: string | null
          match_confidence: number
          match_method: string
          match_status?: string
          patient_id?: number | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_truth?: string
          updated_at?: string
        }
        Update: {
          admission_id?: number | null
          attribution_type?: string
          created_at?: string
          created_by_run_id?: number | null
          crm_appointment_date?: string | null
          crm_log_date?: string | null
          crm_log_id?: number | null
          id?: number
          invoice_date?: string | null
          invoice_no?: string | null
          match_confidence?: number
          match_method?: string
          match_status?: string
          patient_id?: number | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_truth?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_invoice_reconciliation_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_created_by_run_id_fkey"
            columns: ["created_by_run_id"]
            isOneToOne: false
            referencedRelation: "data_correction_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_crm_log_id_fkey"
            columns: ["crm_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_invoice_reconciliation_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          agent_name: string | null
          campaign_name: string | null
          created_at: string | null
          diabetes_status: string | null
          external_lead_id: string | null
          id: number
          lead_bucket: string | null
          lead_name: string | null
          lead_status: string | null
          main_problem: string | null
          notes: string | null
          patient_id: number | null
          patient_type: string | null
          phone: string | null
          phone_normalized: string | null
          priority: string | null
          referral_name: string | null
          source: string | null
          source_system: string | null
          updated_at: string | null
          updated_by: string | null
          urgency: string | null
        }
        Insert: {
          agent_name?: string | null
          campaign_name?: string | null
          created_at?: string | null
          diabetes_status?: string | null
          external_lead_id?: string | null
          id?: number
          lead_bucket?: string | null
          lead_name?: string | null
          lead_status?: string | null
          main_problem?: string | null
          notes?: string | null
          patient_id?: number | null
          patient_type?: string | null
          phone?: string | null
          phone_normalized?: string | null
          priority?: string | null
          referral_name?: string | null
          source?: string | null
          source_system?: string | null
          updated_at?: string | null
          updated_by?: string | null
          urgency?: string | null
        }
        Update: {
          agent_name?: string | null
          campaign_name?: string | null
          created_at?: string | null
          diabetes_status?: string | null
          external_lead_id?: string | null
          id?: number
          lead_bucket?: string | null
          lead_name?: string | null
          lead_status?: string | null
          main_problem?: string | null
          notes?: string | null
          patient_id?: number | null
          patient_type?: string | null
          phone?: string | null
          phone_normalized?: string | null
          priority?: string | null
          referral_name?: string | null
          source?: string | null
          source_system?: string | null
          updated_at?: string | null
          updated_by?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      data_change_audit_log: {
        Row: {
          changed_at: string
          changed_by: string
          changed_columns: string[] | null
          id: number
          new_data: Json | null
          old_data: Json | null
          operation: string
          reason: string | null
          row_pk: string | null
          run_id: number | null
          schema_name: string
          source_truth: string
          table_name: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string
          changed_columns?: string[] | null
          id?: number
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          reason?: string | null
          row_pk?: string | null
          run_id?: number | null
          schema_name: string
          source_truth?: string
          table_name: string
        }
        Update: {
          changed_at?: string
          changed_by?: string
          changed_columns?: string[] | null
          id?: number
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          reason?: string | null
          row_pk?: string | null
          run_id?: number | null
          schema_name?: string
          source_truth?: string
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_change_audit_log_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "data_correction_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      data_correction_runs: {
        Row: {
          completed_at: string | null
          id: number
          run_name: string
          run_reason: string
          source_of_truth: string
          started_at: string
          summary: Json
        }
        Insert: {
          completed_at?: string | null
          id?: number
          run_name: string
          run_reason: string
          source_of_truth?: string
          started_at?: string
          summary?: Json
        }
        Update: {
          completed_at?: string | null
          id?: number
          run_name?: string
          run_reason?: string
          source_of_truth?: string
          started_at?: string
          summary?: Json
        }
        Relationships: []
      }
      doctor_item_share_rules: {
        Row: {
          created_at: string | null
          doctor_id: number
          doctor_share_pct: number
          effective_from: string
          effective_to: string | null
          id: number
          service_item_id: number
        }
        Insert: {
          created_at?: string | null
          doctor_id: number
          doctor_share_pct: number
          effective_from?: string
          effective_to?: string | null
          id?: number
          service_item_id: number
        }
        Update: {
          created_at?: string | null
          doctor_id?: number
          doctor_share_pct?: number
          effective_from?: string
          effective_to?: string | null
          id?: number
          service_item_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "doctor_item_share_rules_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_item_share_rules_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "doctor_item_share_rules_service_item_id_fkey"
            columns: ["service_item_id"]
            isOneToOne: false
            referencedRelation: "service_items"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_revenue_share_rules: {
        Row: {
          category_id: number
          created_at: string | null
          doctor_id: number
          effective_from: string
          effective_to: string | null
          id: number
          notes: string | null
          share_percentage: number
        }
        Insert: {
          category_id: number
          created_at?: string | null
          doctor_id: number
          effective_from?: string
          effective_to?: string | null
          id?: number
          notes?: string | null
          share_percentage: number
        }
        Update: {
          category_id?: number
          created_at?: string | null
          doctor_id?: number
          effective_from?: string
          effective_to?: string | null
          id?: number
          notes?: string | null
          share_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "doctor_revenue_share_rules_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_revenue_share_rules_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_revenue_share_rules_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
        ]
      }
      doctor_schedules: {
        Row: {
          created_at: string
          day_of_week: number
          doctor_name: string
          end_time: string
          id: number
          is_active: boolean
          slot_minutes: number
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          doctor_name: string
          end_time: string
          id?: never
          is_active?: boolean
          slot_minutes?: number
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          doctor_name?: string
          end_time?: string
          id?: never
          is_active?: boolean
          slot_minutes?: number
          start_time?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean | null
          name: string
          short_code: string | null
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          short_code?: string | null
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          short_code?: string | null
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dropdown_options: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          id: string
          label: string
          sort_order: number | null
          updated_at: string | null
          value: string
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          id?: string
          label: string
          sort_order?: number | null
          updated_at?: string | null
          value: string
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          id?: string
          label?: string
          sort_order?: number | null
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      invoice_discounts: {
        Row: {
          admission_id: number | null
          amount: number
          approved_by: string | null
          created_at: string
          discount_date: string | null
          discount_type: string | null
          id: number
          invoice_id: number
          needs_review: boolean
          raw_discount_json: Json
          raw_discount_text: string | null
          review_reason: string | null
          updated_at: string
        }
        Insert: {
          admission_id?: number | null
          amount: number
          approved_by?: string | null
          created_at?: string
          discount_date?: string | null
          discount_type?: string | null
          id?: number
          invoice_id: number
          needs_review?: boolean
          raw_discount_json?: Json
          raw_discount_text?: string | null
          review_reason?: string | null
          updated_at?: string
        }
        Update: {
          admission_id?: number | null
          amount?: number
          approved_by?: string | null
          created_at?: string
          discount_date?: string | null
          discount_type?: string | null
          id?: number
          invoice_id?: number
          needs_review?: boolean
          raw_discount_json?: Json
          raw_discount_text?: string | null
          review_reason?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_discounts_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_discounts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_discounts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_discounts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_discounts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_discounts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_validation_status"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_discounts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "vw_finance_invoice_summary"
            referencedColumns: ["invoice_id"]
          },
        ]
      }
      invoice_import_errors: {
        Row: {
          created_at: string
          error_code: string | null
          error_message: string
          error_stage: string
          id: number
          import_run_id: number | null
          invoice_no: string | null
          raw_payload: Json
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          source_document_id: string | null
        }
        Insert: {
          created_at?: string
          error_code?: string | null
          error_message: string
          error_stage: string
          id?: number
          import_run_id?: number | null
          invoice_no?: string | null
          raw_payload?: Json
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          source_document_id?: string | null
        }
        Update: {
          created_at?: string
          error_code?: string | null
          error_message?: string
          error_stage?: string
          id?: number
          import_run_id?: number | null
          invoice_no?: string | null
          raw_payload?: Json
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          source_document_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_import_errors_import_run_id_fkey"
            columns: ["import_run_id"]
            isOneToOne: false
            referencedRelation: "invoice_import_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_import_errors_source_document_id_fkey"
            columns: ["source_document_id"]
            isOneToOne: false
            referencedRelation: "invoice_source_documents"
            referencedColumns: ["file_id"]
          },
        ]
      }
      invoice_import_runs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_count: number | null
          id: number
          parser_name: string | null
          parser_version: string | null
          run_key: string
          source_folder_url: string | null
          source_sheet_id: string | null
          source_sheet_name: string | null
          source_system: string
          started_at: string
          status: string
          summary: Json
          total_files: number | null
          total_invoices: number | null
          total_line_items: number | null
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_count?: number | null
          id?: number
          parser_name?: string | null
          parser_version?: string | null
          run_key: string
          source_folder_url?: string | null
          source_sheet_id?: string | null
          source_sheet_name?: string | null
          source_system?: string
          started_at?: string
          status?: string
          summary?: Json
          total_files?: number | null
          total_invoices?: number | null
          total_line_items?: number | null
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_count?: number | null
          id?: number
          parser_name?: string | null
          parser_version?: string | null
          run_key?: string
          source_folder_url?: string | null
          source_sheet_id?: string | null
          source_sheet_name?: string | null
          source_system?: string
          started_at?: string
          status?: string
          summary?: Json
          total_files?: number | null
          total_invoices?: number | null
          total_line_items?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      invoice_inventory_movements: {
        Row: {
          admission_id: number | null
          catalog_item_id: number | null
          created_at: string
          id: number
          invoice_id: number
          invoice_line_item_id: number
          item_name: string
          location: string | null
          movement_date: string
          movement_type: string
          notes: string | null
          patient_id: number | null
          quantity: number
          sku: string | null
          source: string
          status: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          admission_id?: number | null
          catalog_item_id?: number | null
          created_at?: string
          id?: number
          invoice_id: number
          invoice_line_item_id: number
          item_name: string
          location?: string | null
          movement_date: string
          movement_type?: string
          notes?: string | null
          patient_id?: number | null
          quantity: number
          sku?: string | null
          source?: string
          status?: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          admission_id?: number | null
          catalog_item_id?: number | null
          created_at?: string
          id?: number
          invoice_id?: number
          invoice_line_item_id?: number
          item_name?: string
          location?: string | null
          movement_date?: string
          movement_type?: string
          notes?: string | null
          patient_id?: number | null
          quantity?: number
          sku?: string | null
          source?: string
          status?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_inventory_movements_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "invoice_item_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_validation_status"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "vw_finance_invoice_summary"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_line_item_id_fkey"
            columns: ["invoice_line_item_id"]
            isOneToOne: true
            referencedRelation: "invoice_line_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_line_item_id_fkey"
            columns: ["invoice_line_item_id"]
            isOneToOne: true
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["line_item_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_line_item_id_fkey"
            columns: ["invoice_line_item_id"]
            isOneToOne: true
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["line_item_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_invoice_line_item_id_fkey"
            columns: ["invoice_line_item_id"]
            isOneToOne: true
            referencedRelation: "vw_finance_line_item_summary"
            referencedColumns: ["line_item_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_inventory_movements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      invoice_item_aliases: {
        Row: {
          active: boolean
          alias_name: string
          catalog_item_id: number
          created_at: string
          id: number
          match_confidence: number | null
          normalized_alias: string | null
          notes: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          alias_name: string
          catalog_item_id: number
          created_at?: string
          id?: number
          match_confidence?: number | null
          normalized_alias?: string | null
          notes?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          alias_name?: string
          catalog_item_id?: number
          created_at?: string
          id?: number
          match_confidence?: number | null
          normalized_alias?: string | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_item_aliases_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "invoice_item_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_item_catalog: {
        Row: {
          active: boolean
          canonical_name: string
          canonical_name_normalized: string | null
          cogs_tracking_enabled: boolean
          created_at: string
          default_category_id: number | null
          default_cogs_per_unit: number | null
          default_usage_multiplier: number
          display_name: string | null
          id: number
          inventory_class: string
          is_billable: boolean
          is_inventory_tracked: boolean
          is_revenue_share_eligible: boolean
          item_type: string
          notes: string | null
          product_code: string | null
          service_item_id: number | null
          sku: string | null
          stock_unit: string | null
          updated_at: string
          usage_unit: string | null
        }
        Insert: {
          active?: boolean
          canonical_name: string
          canonical_name_normalized?: string | null
          cogs_tracking_enabled?: boolean
          created_at?: string
          default_category_id?: number | null
          default_cogs_per_unit?: number | null
          default_usage_multiplier?: number
          display_name?: string | null
          id?: number
          inventory_class?: string
          is_billable?: boolean
          is_inventory_tracked?: boolean
          is_revenue_share_eligible?: boolean
          item_type?: string
          notes?: string | null
          product_code?: string | null
          service_item_id?: number | null
          sku?: string | null
          stock_unit?: string | null
          updated_at?: string
          usage_unit?: string | null
        }
        Update: {
          active?: boolean
          canonical_name?: string
          canonical_name_normalized?: string | null
          cogs_tracking_enabled?: boolean
          created_at?: string
          default_category_id?: number | null
          default_cogs_per_unit?: number | null
          default_usage_multiplier?: number
          display_name?: string | null
          id?: number
          inventory_class?: string
          is_billable?: boolean
          is_inventory_tracked?: boolean
          is_revenue_share_eligible?: boolean
          item_type?: string
          notes?: string | null
          product_code?: string | null
          service_item_id?: number | null
          sku?: string | null
          stock_unit?: string | null
          updated_at?: string
          usage_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_item_catalog_default_category_id_fkey"
            columns: ["default_category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_item_catalog_service_item_id_fkey"
            columns: ["service_item_id"]
            isOneToOne: false
            referencedRelation: "service_items"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_line_items: {
        Row: {
          admission_id: number | null
          amount: number
          catalog_item_id: number | null
          category_id: number | null
          category_name: string | null
          cogs_per_unit: number | null
          cogs_total: number | null
          created_at: string
          currency: string
          discount_amt: number
          doctor_share_pct: number | null
          gross_amount: number | null
          id: number
          inventory_class: string
          inventory_consumption_status: string
          inventory_location: string | null
          inventory_qty: number | null
          inventory_sku: string | null
          inventory_unit: string | null
          invoice_id: number
          is_billable: boolean
          is_inventory_item: boolean
          is_revenue_share_eligible: boolean
          item_code: string | null
          item_type: string
          line_date: string | null
          line_fingerprint: string | null
          line_seq: number
          needs_review: boolean
          net_amount: number | null
          normalized_particulars: string | null
          parse_confidence: number | null
          parser_name: string | null
          parser_version: string | null
          particulars: string
          patient_id: number | null
          qty: number
          rate: number
          raw_category: string | null
          raw_line_json: Json
          raw_ocr_line: string | null
          revenue_group: string | null
          review_reason: string | null
          service_charge_amt: number
          service_item_id: number | null
          unit: string | null
          updated_at: string
          urgent_fee_amt: number
          vat_amt: number
        }
        Insert: {
          admission_id?: number | null
          amount?: number
          catalog_item_id?: number | null
          category_id?: number | null
          category_name?: string | null
          cogs_per_unit?: number | null
          cogs_total?: number | null
          created_at?: string
          currency?: string
          discount_amt?: number
          doctor_share_pct?: number | null
          gross_amount?: number | null
          id?: number
          inventory_class?: string
          inventory_consumption_status?: string
          inventory_location?: string | null
          inventory_qty?: number | null
          inventory_sku?: string | null
          inventory_unit?: string | null
          invoice_id: number
          is_billable?: boolean
          is_inventory_item?: boolean
          is_revenue_share_eligible?: boolean
          item_code?: string | null
          item_type?: string
          line_date?: string | null
          line_fingerprint?: string | null
          line_seq: number
          needs_review?: boolean
          net_amount?: number | null
          normalized_particulars?: string | null
          parse_confidence?: number | null
          parser_name?: string | null
          parser_version?: string | null
          particulars: string
          patient_id?: number | null
          qty?: number
          rate?: number
          raw_category?: string | null
          raw_line_json?: Json
          raw_ocr_line?: string | null
          revenue_group?: string | null
          review_reason?: string | null
          service_charge_amt?: number
          service_item_id?: number | null
          unit?: string | null
          updated_at?: string
          urgent_fee_amt?: number
          vat_amt?: number
        }
        Update: {
          admission_id?: number | null
          amount?: number
          catalog_item_id?: number | null
          category_id?: number | null
          category_name?: string | null
          cogs_per_unit?: number | null
          cogs_total?: number | null
          created_at?: string
          currency?: string
          discount_amt?: number
          doctor_share_pct?: number | null
          gross_amount?: number | null
          id?: number
          inventory_class?: string
          inventory_consumption_status?: string
          inventory_location?: string | null
          inventory_qty?: number | null
          inventory_sku?: string | null
          inventory_unit?: string | null
          invoice_id?: number
          is_billable?: boolean
          is_inventory_item?: boolean
          is_revenue_share_eligible?: boolean
          item_code?: string | null
          item_type?: string
          line_date?: string | null
          line_fingerprint?: string | null
          line_seq?: number
          needs_review?: boolean
          net_amount?: number | null
          normalized_particulars?: string | null
          parse_confidence?: number | null
          parser_name?: string | null
          parser_version?: string | null
          particulars?: string
          patient_id?: number | null
          qty?: number
          rate?: number
          raw_category?: string | null
          raw_line_json?: Json
          raw_ocr_line?: string | null
          revenue_group?: string | null
          review_reason?: string | null
          service_charge_amt?: number
          service_item_id?: number | null
          unit?: string | null
          updated_at?: string
          urgent_fee_amt?: number
          vat_amt?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_line_items_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_line_items_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "invoice_item_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_validation_status"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "vw_finance_invoice_summary"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoice_line_items_service_item_id_fkey"
            columns: ["service_item_id"]
            isOneToOne: false
            referencedRelation: "service_items"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_payments: {
        Row: {
          admission_id: number | null
          amount: number
          collector: string | null
          created_at: string
          currency: string
          id: number
          invoice_id: number
          needs_review: boolean
          pay_date: string | null
          pay_mode: string | null
          pay_no: string | null
          pay_type: string | null
          raw_payment_json: Json
          raw_payment_text: string | null
          review_reason: string | null
          updated_at: string
        }
        Insert: {
          admission_id?: number | null
          amount: number
          collector?: string | null
          created_at?: string
          currency?: string
          id?: number
          invoice_id: number
          needs_review?: boolean
          pay_date?: string | null
          pay_mode?: string | null
          pay_no?: string | null
          pay_type?: string | null
          raw_payment_json?: Json
          raw_payment_text?: string | null
          review_reason?: string | null
          updated_at?: string
        }
        Update: {
          admission_id?: number | null
          amount?: number
          collector?: string | null
          created_at?: string
          currency?: string
          id?: number
          invoice_id?: number
          needs_review?: boolean
          pay_date?: string | null
          pay_mode?: string | null
          pay_no?: string | null
          pay_type?: string | null
          raw_payment_json?: Json
          raw_payment_text?: string | null
          review_reason?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_payments_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_validation_status"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "vw_finance_invoice_summary"
            referencedColumns: ["invoice_id"]
          },
        ]
      }
      invoice_pdf_queue_status: {
        Row: {
          claude_status: string | null
          file_id: string
          file_name: string | null
          invoice_date: string | null
          invoice_no: string | null
          needs_review: boolean | null
          notes: string | null
          patient_name: string | null
          pdf_url: string | null
          processed_at: string | null
          supabase_status: string | null
          updated_at: string | null
        }
        Insert: {
          claude_status?: string | null
          file_id: string
          file_name?: string | null
          invoice_date?: string | null
          invoice_no?: string | null
          needs_review?: boolean | null
          notes?: string | null
          patient_name?: string | null
          pdf_url?: string | null
          processed_at?: string | null
          supabase_status?: string | null
          updated_at?: string | null
        }
        Update: {
          claude_status?: string | null
          file_id?: string
          file_name?: string | null
          invoice_date?: string | null
          invoice_no?: string | null
          needs_review?: boolean | null
          notes?: string | null
          patient_name?: string | null
          pdf_url?: string | null
          processed_at?: string | null
          supabase_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invoice_source_documents: {
        Row: {
          created_at: string
          dedupe_key: string | null
          file_hash: string | null
          file_id: string
          file_name: string | null
          imported_at: string | null
          line_items_csv_raw: string | null
          moved_at: string | null
          ocr_char_count: number | null
          ocr_doc_id: string | null
          ocr_doc_url: string | null
          ocr_status: string | null
          ocr_text: string | null
          parser_error: string | null
          parser_name: string | null
          parser_status: string | null
          parser_version: string | null
          pdf_url: string | null
          processed_at: string | null
          queued_at: string | null
          source_folder_url: string | null
          source_sheet_id: string | null
          source_sheet_name: string | null
          source_sheet_row_number: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dedupe_key?: string | null
          file_hash?: string | null
          file_id: string
          file_name?: string | null
          imported_at?: string | null
          line_items_csv_raw?: string | null
          moved_at?: string | null
          ocr_char_count?: number | null
          ocr_doc_id?: string | null
          ocr_doc_url?: string | null
          ocr_status?: string | null
          ocr_text?: string | null
          parser_error?: string | null
          parser_name?: string | null
          parser_status?: string | null
          parser_version?: string | null
          pdf_url?: string | null
          processed_at?: string | null
          queued_at?: string | null
          source_folder_url?: string | null
          source_sheet_id?: string | null
          source_sheet_name?: string | null
          source_sheet_row_number?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dedupe_key?: string | null
          file_hash?: string | null
          file_id?: string
          file_name?: string | null
          imported_at?: string | null
          line_items_csv_raw?: string | null
          moved_at?: string | null
          ocr_char_count?: number | null
          ocr_doc_id?: string | null
          ocr_doc_url?: string | null
          ocr_status?: string | null
          ocr_text?: string | null
          parser_error?: string | null
          parser_name?: string | null
          parser_status?: string | null
          parser_version?: string | null
          pdf_url?: string | null
          processed_at?: string | null
          queued_at?: string | null
          source_folder_url?: string | null
          source_sheet_id?: string | null
          source_sheet_name?: string | null
          source_sheet_row_number?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          admission_id: number | null
          admitted_on: string | null
          age_text: string | null
          an: string | null
          bed_name: string | null
          consultant_name_raw: string | null
          created_at: string
          currency: string
          department: string | null
          discharged_on: string | null
          discount_total: number
          dob: string | null
          doctor_id: number | null
          expected_line_item_count: number | null
          gender: string | null
          hn: string | null
          id: number
          import_run_id: number | null
          invoice_date: string | null
          invoice_no: string
          invoice_status: string
          invoice_type: string
          item_total: number
          line_item_amount_sum: number
          marital_status: string | null
          needs_review: boolean
          net_bill: number
          parse_confidence: number | null
          parsed_line_item_count: number
          parser_name: string | null
          parser_version: string | null
          patient_address: string | null
          patient_id: number | null
          patient_name_normalized: string | null
          patient_name_raw: string | null
          patient_phone: string | null
          patient_type: string | null
          payment_status: string
          raw_header: Json
          raw_ocr_text: string | null
          raw_totals_text: string | null
          reconciliation_delta: number | null
          reconciliation_status: string
          referred_by_id: number | null
          referred_by_name_raw: string | null
          review_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          service_charge_total: number
          source_document_id: string | null
          source_sheet_row_number: number | null
          source_system: string
          total_bill: number
          total_collected: number
          total_due: number
          total_refund: number
          updated_at: string
          urgent_fee_total: number
          vat_total: number
          ward_name: string | null
        }
        Insert: {
          admission_id?: number | null
          admitted_on?: string | null
          age_text?: string | null
          an?: string | null
          bed_name?: string | null
          consultant_name_raw?: string | null
          created_at?: string
          currency?: string
          department?: string | null
          discharged_on?: string | null
          discount_total?: number
          dob?: string | null
          doctor_id?: number | null
          expected_line_item_count?: number | null
          gender?: string | null
          hn?: string | null
          id?: number
          import_run_id?: number | null
          invoice_date?: string | null
          invoice_no: string
          invoice_status?: string
          invoice_type?: string
          item_total?: number
          line_item_amount_sum?: number
          marital_status?: string | null
          needs_review?: boolean
          net_bill?: number
          parse_confidence?: number | null
          parsed_line_item_count?: number
          parser_name?: string | null
          parser_version?: string | null
          patient_address?: string | null
          patient_id?: number | null
          patient_name_normalized?: string | null
          patient_name_raw?: string | null
          patient_phone?: string | null
          patient_type?: string | null
          payment_status?: string
          raw_header?: Json
          raw_ocr_text?: string | null
          raw_totals_text?: string | null
          reconciliation_delta?: number | null
          reconciliation_status?: string
          referred_by_id?: number | null
          referred_by_name_raw?: string | null
          review_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          service_charge_total?: number
          source_document_id?: string | null
          source_sheet_row_number?: number | null
          source_system?: string
          total_bill?: number
          total_collected?: number
          total_due?: number
          total_refund?: number
          updated_at?: string
          urgent_fee_total?: number
          vat_total?: number
          ward_name?: string | null
        }
        Update: {
          admission_id?: number | null
          admitted_on?: string | null
          age_text?: string | null
          an?: string | null
          bed_name?: string | null
          consultant_name_raw?: string | null
          created_at?: string
          currency?: string
          department?: string | null
          discharged_on?: string | null
          discount_total?: number
          dob?: string | null
          doctor_id?: number | null
          expected_line_item_count?: number | null
          gender?: string | null
          hn?: string | null
          id?: number
          import_run_id?: number | null
          invoice_date?: string | null
          invoice_no?: string
          invoice_status?: string
          invoice_type?: string
          item_total?: number
          line_item_amount_sum?: number
          marital_status?: string | null
          needs_review?: boolean
          net_bill?: number
          parse_confidence?: number | null
          parsed_line_item_count?: number
          parser_name?: string | null
          parser_version?: string | null
          patient_address?: string | null
          patient_id?: number | null
          patient_name_normalized?: string | null
          patient_name_raw?: string | null
          patient_phone?: string | null
          patient_type?: string | null
          payment_status?: string
          raw_header?: Json
          raw_ocr_text?: string | null
          raw_totals_text?: string | null
          reconciliation_delta?: number | null
          reconciliation_status?: string
          referred_by_id?: number | null
          referred_by_name_raw?: string | null
          review_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          service_charge_total?: number
          source_document_id?: string | null
          source_sheet_row_number?: number | null
          source_system?: string
          total_bill?: number
          total_collected?: number
          total_due?: number
          total_refund?: number
          updated_at?: string
          urgent_fee_total?: number
          vat_total?: number
          ward_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "invoices_import_run_id_fkey"
            columns: ["import_run_id"]
            isOneToOne: false
            referencedRelation: "invoice_import_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "invoices_source_document_id_fkey"
            columns: ["source_document_id"]
            isOneToOne: false
            referencedRelation: "invoice_source_documents"
            referencedColumns: ["file_id"]
          },
        ]
      }
      lead_attribution: {
        Row: {
          attribution_confidence: number | null
          attribution_level: string
          call_center_log_id: number | null
          campaign_bucket: string | null
          created_at: string | null
          first_touch_date: string | null
          id: string
          internal_type_code: string | null
          last_touch_date: string | null
          lead_category: string | null
          lead_id: number | null
          meta_ad_id: string | null
          meta_ad_name: string | null
          meta_adset_id: string | null
          meta_adset_name: string | null
          meta_campaign_id: string | null
          meta_campaign_name: string | null
          notes: string | null
          patient_id: number | null
          phone_e164: string | null
          self_reported_source: string | null
          source_category: string
          updated_at: string | null
        }
        Insert: {
          attribution_confidence?: number | null
          attribution_level: string
          call_center_log_id?: number | null
          campaign_bucket?: string | null
          created_at?: string | null
          first_touch_date?: string | null
          id?: string
          internal_type_code?: string | null
          last_touch_date?: string | null
          lead_category?: string | null
          lead_id?: number | null
          meta_ad_id?: string | null
          meta_ad_name?: string | null
          meta_adset_id?: string | null
          meta_adset_name?: string | null
          meta_campaign_id?: string | null
          meta_campaign_name?: string | null
          notes?: string | null
          patient_id?: number | null
          phone_e164?: string | null
          self_reported_source?: string | null
          source_category?: string
          updated_at?: string | null
        }
        Update: {
          attribution_confidence?: number | null
          attribution_level?: string
          call_center_log_id?: number | null
          campaign_bucket?: string | null
          created_at?: string | null
          first_touch_date?: string | null
          id?: string
          internal_type_code?: string | null
          last_touch_date?: string | null
          lead_category?: string | null
          lead_id?: number | null
          meta_ad_id?: string | null
          meta_ad_name?: string | null
          meta_adset_id?: string | null
          meta_adset_name?: string | null
          meta_campaign_id?: string | null
          meta_campaign_name?: string | null
          notes?: string | null
          patient_id?: number | null
          phone_e164?: string | null
          self_reported_source?: string | null
          source_category?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "lead_attribution_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      lookup_ad_campaigns: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_appointment_statuses: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_appointment_time_slots: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_call_categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_call_center_agents: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_call_outcomes: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_doctors: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_final_statuses: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_followup_priorities: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_internal_lead_categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_lead_categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_patient_new_old: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      lookup_sources_of_appointment: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          value?: string
        }
        Relationships: []
      }
      marketing_campaign_map: {
        Row: {
          active_status: string | null
          campaign_bucket: string
          created_at: string | null
          end_date: string | null
          exclude_from_benchmarks: boolean
          funnel_stage: string | null
          id: string
          internal_type_code: string
          meta_campaign_id: string | null
          meta_campaign_name: string | null
          notes: string | null
          offer_type: string | null
          service_line: string | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          active_status?: string | null
          campaign_bucket: string
          created_at?: string | null
          end_date?: string | null
          exclude_from_benchmarks?: boolean
          funnel_stage?: string | null
          id?: string
          internal_type_code?: string
          meta_campaign_id?: string | null
          meta_campaign_name?: string | null
          notes?: string | null
          offer_type?: string | null
          service_line?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          active_status?: string | null
          campaign_bucket?: string
          created_at?: string | null
          end_date?: string | null
          exclude_from_benchmarks?: boolean
          funnel_stage?: string | null
          id?: string
          internal_type_code?: string
          meta_campaign_id?: string | null
          meta_campaign_name?: string | null
          notes?: string | null
          offer_type?: string | null
          service_line?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      marketing_creative_tags: {
        Row: {
          campaign_bucket: string | null
          character_type: string | null
          created_at: string | null
          creative_format: string | null
          cta_type: string | null
          id: string
          language_style: string | null
          meta_ad_id: string | null
          meta_ad_name: string | null
          notes: string | null
          offer_type: string | null
          patient_segment: string | null
          primary_hook: string | null
          thumbnail_url: string | null
          trust_signal: string | null
          updated_at: string | null
          video_url: string | null
          visual_style: string | null
        }
        Insert: {
          campaign_bucket?: string | null
          character_type?: string | null
          created_at?: string | null
          creative_format?: string | null
          cta_type?: string | null
          id?: string
          language_style?: string | null
          meta_ad_id?: string | null
          meta_ad_name?: string | null
          notes?: string | null
          offer_type?: string | null
          patient_segment?: string | null
          primary_hook?: string | null
          thumbnail_url?: string | null
          trust_signal?: string | null
          updated_at?: string | null
          video_url?: string | null
          visual_style?: string | null
        }
        Update: {
          campaign_bucket?: string | null
          character_type?: string | null
          created_at?: string | null
          creative_format?: string | null
          cta_type?: string | null
          id?: string
          language_style?: string | null
          meta_ad_id?: string | null
          meta_ad_name?: string | null
          notes?: string | null
          offer_type?: string | null
          patient_segment?: string | null
          primary_hook?: string | null
          thumbnail_url?: string | null
          trust_signal?: string | null
          updated_at?: string | null
          video_url?: string | null
          visual_style?: string | null
        }
        Relationships: []
      }
      marketing_daily_spend: {
        Row: {
          clicks: number | null
          conversations: number | null
          cpc: number | null
          cpm: number | null
          cpr: number | null
          created_at: string | null
          ctr: number | null
          date: string
          frequency: number | null
          id: string
          impressions: number | null
          link_clicks: number | null
          meta_ad_id: string | null
          meta_ad_name: string | null
          meta_adset_id: string | null
          meta_adset_name: string | null
          meta_campaign_id: string | null
          meta_campaign_name: string | null
          reach: number | null
          source_payload: Json | null
          spend_bdt: number | null
          spend_usd: number | null
          updated_at: string | null
          video_100_views: number | null
          video_25_views: number | null
          video_3s_views: number | null
          video_50_views: number | null
          video_75_views: number | null
          video_95_views: number | null
          video_thruplays: number | null
        }
        Insert: {
          clicks?: number | null
          conversations?: number | null
          cpc?: number | null
          cpm?: number | null
          cpr?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          frequency?: number | null
          id?: string
          impressions?: number | null
          link_clicks?: number | null
          meta_ad_id?: string | null
          meta_ad_name?: string | null
          meta_adset_id?: string | null
          meta_adset_name?: string | null
          meta_campaign_id?: string | null
          meta_campaign_name?: string | null
          reach?: number | null
          source_payload?: Json | null
          spend_bdt?: number | null
          spend_usd?: number | null
          updated_at?: string | null
          video_100_views?: number | null
          video_25_views?: number | null
          video_3s_views?: number | null
          video_50_views?: number | null
          video_75_views?: number | null
          video_95_views?: number | null
          video_thruplays?: number | null
        }
        Update: {
          clicks?: number | null
          conversations?: number | null
          cpc?: number | null
          cpm?: number | null
          cpr?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          frequency?: number | null
          id?: string
          impressions?: number | null
          link_clicks?: number | null
          meta_ad_id?: string | null
          meta_ad_name?: string | null
          meta_adset_id?: string | null
          meta_adset_name?: string | null
          meta_campaign_id?: string | null
          meta_campaign_name?: string | null
          reach?: number | null
          source_payload?: Json | null
          spend_bdt?: number | null
          spend_usd?: number | null
          updated_at?: string | null
          video_100_views?: number | null
          video_25_views?: number | null
          video_3s_views?: number | null
          video_50_views?: number | null
          video_75_views?: number | null
          video_95_views?: number | null
          video_thruplays?: number | null
        }
        Relationships: []
      }
      meta_offline_conversion_queue: {
        Row: {
          action_source: string
          admission_id: number | null
          attempts: number
          city: string | null
          country: string
          created_at: string
          currency: string
          email: string | null
          error_message: string | null
          event_id: string
          event_name: string
          event_time: string
          excluded: boolean
          exclusion_reason: string | null
          first_name: string | null
          id: string
          last_attempt_at: string | null
          last_name: string | null
          meta_route: string
          normalized_phone: string | null
          patient_id: number | null
          payload: Json | null
          sent_at: string | null
          source_lead_id: number | null
          source_path: string
          status: string
          updated_at: string
          value: number | null
        }
        Insert: {
          action_source?: string
          admission_id?: number | null
          attempts?: number
          city?: string | null
          country?: string
          created_at?: string
          currency?: string
          email?: string | null
          error_message?: string | null
          event_id: string
          event_name: string
          event_time: string
          excluded?: boolean
          exclusion_reason?: string | null
          first_name?: string | null
          id?: string
          last_attempt_at?: string | null
          last_name?: string | null
          meta_route: string
          normalized_phone?: string | null
          patient_id?: number | null
          payload?: Json | null
          sent_at?: string | null
          source_lead_id?: number | null
          source_path: string
          status?: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          action_source?: string
          admission_id?: number | null
          attempts?: number
          city?: string | null
          country?: string
          created_at?: string
          currency?: string
          email?: string | null
          error_message?: string | null
          event_id?: string
          event_name?: string
          event_time?: string
          excluded?: boolean
          exclusion_reason?: string | null
          first_name?: string | null
          id?: string
          last_attempt_at?: string | null
          last_name?: string | null
          meta_route?: string
          normalized_phone?: string | null
          patient_id?: number | null
          payload?: Json | null
          sent_at?: string | null
          source_lead_id?: number | null
          source_path?: string
          status?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: []
      }
      outgoing_call_attempts: {
        Row: {
          agent_id: string | null
          assigned_agent: string
          booked_appointment_id: number | null
          callback_at: string | null
          called_at: string | null
          confirmed: boolean
          created_at: string
          followup_number: number
          id: number
          notes: string | null
          outcome: string | null
          outcome_code: string | null
          queue_id: number
          scheduled_date: string
          status: string
        }
        Insert: {
          agent_id?: string | null
          assigned_agent: string
          booked_appointment_id?: number | null
          callback_at?: string | null
          called_at?: string | null
          confirmed?: boolean
          created_at?: string
          followup_number: number
          id?: never
          notes?: string | null
          outcome?: string | null
          outcome_code?: string | null
          queue_id: number
          scheduled_date: string
          status?: string
        }
        Update: {
          agent_id?: string | null
          assigned_agent?: string
          booked_appointment_id?: number | null
          callback_at?: string | null
          called_at?: string | null
          confirmed?: boolean
          created_at?: string
          followup_number?: number
          id?: never
          notes?: string | null
          outcome?: string | null
          outcome_code?: string | null
          queue_id?: number
          scheduled_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_call_attempts_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_patient_resolution"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "calendar_appointment_detail"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "crm_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "day_detail_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "no_show_followup_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "today_appointments_view"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_booked_appointment_id_fkey"
            columns: ["booked_appointment_id"]
            isOneToOne: false
            referencedRelation: "validated_appointments"
            referencedColumns: ["appointment_id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "outgoing_call_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "vw_no_show_recovery_queue"
            referencedColumns: ["queue_id"]
          },
        ]
      }
      outgoing_call_queue: {
        Row: {
          category: string
          category_rank: number
          created_at: string
          final_location: string | null
          followups_done: number
          id: number
          lead_type: string | null
          max_followups: number
          no_show_risk: string | null
          patient_id: number | null
          patient_name: string | null
          phone: string | null
          pinned_to_top: boolean
          reason: string | null
          relevant_date: string | null
          source_id: string | null
          source_table: string | null
          status: string
          updated_at: string
        }
        Insert: {
          category: string
          category_rank: number
          created_at?: string
          final_location?: string | null
          followups_done?: number
          id?: never
          lead_type?: string | null
          max_followups?: number
          no_show_risk?: string | null
          patient_id?: number | null
          patient_name?: string | null
          phone?: string | null
          pinned_to_top?: boolean
          reason?: string | null
          relevant_date?: string | null
          source_id?: string | null
          source_table?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          category_rank?: number
          created_at?: string
          final_location?: string | null
          followups_done?: number
          id?: never
          lead_type?: string | null
          max_followups?: number
          no_show_risk?: string | null
          patient_id?: number | null
          patient_name?: string | null
          phone?: string | null
          pinned_to_top?: boolean
          reason?: string | null
          relevant_date?: string | null
          source_id?: string | null
          source_table?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      outgoing_call_schedule_config: {
        Row: {
          agent_sequence: string[]
          anchor_date: string
          id: number
        }
        Insert: {
          agent_sequence: string[]
          anchor_date: string
          id?: number
        }
        Update: {
          agent_sequence?: string[]
          anchor_date?: string
          id?: number
        }
        Relationships: []
      }
      patient_identity_keys: {
        Row: {
          confidence: number
          created_at: string
          id: number
          is_active: boolean
          key_type: string
          key_value: string
          patient_id: number
          source_record_id: string | null
          source_table: string | null
          updated_at: string
        }
        Insert: {
          confidence?: number
          created_at?: string
          id?: number
          is_active?: boolean
          key_type: string
          key_value: string
          patient_id: number
          source_record_id?: string | null
          source_table?: string | null
          updated_at?: string
        }
        Update: {
          confidence?: number
          created_at?: string
          id?: number
          is_active?: boolean
          key_type?: string
          key_value?: string
          patient_id?: number
          source_record_id?: string | null
          source_table?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "patient_identity_keys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          area: string | null
          created_at: string | null
          crm_notes: string | null
          diabetes_status: string | null
          dob: string | null
          email: string | null
          external_patient_id: string | null
          father_name: string | null
          full_name: string
          gender: string | null
          healing_status: string | null
          hn: string
          hospital_patient_id: string | null
          id: number
          marital_status: string | null
          mother_name: string | null
          nid: string | null
          patient_type: string | null
          phone: string | null
          phone_e164: string | null
          secondary_phone: string | null
          source_system: string | null
          spouse_name: string | null
          surgery_flagged_at: string | null
          surgery_scheduled: boolean
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          created_at?: string | null
          crm_notes?: string | null
          diabetes_status?: string | null
          dob?: string | null
          email?: string | null
          external_patient_id?: string | null
          father_name?: string | null
          full_name: string
          gender?: string | null
          healing_status?: string | null
          hn: string
          hospital_patient_id?: string | null
          id?: number
          marital_status?: string | null
          mother_name?: string | null
          nid?: string | null
          patient_type?: string | null
          phone?: string | null
          phone_e164?: string | null
          secondary_phone?: string | null
          source_system?: string | null
          spouse_name?: string | null
          surgery_flagged_at?: string | null
          surgery_scheduled?: boolean
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          created_at?: string | null
          crm_notes?: string | null
          diabetes_status?: string | null
          dob?: string | null
          email?: string | null
          external_patient_id?: string | null
          father_name?: string | null
          full_name?: string
          gender?: string | null
          healing_status?: string | null
          hn?: string
          hospital_patient_id?: string | null
          id?: number
          marital_status?: string | null
          mother_name?: string | null
          nid?: string | null
          patient_type?: string | null
          phone?: string | null
          phone_e164?: string | null
          secondary_phone?: string | null
          source_system?: string | null
          spouse_name?: string | null
          surgery_flagged_at?: string | null
          surgery_scheduled?: boolean
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          category_group: string
          created_at: string | null
          id: number
          is_revenue_share_eligible: boolean | null
          name: string
          sort_order: number | null
        }
        Insert: {
          category_group?: string
          created_at?: string | null
          id?: number
          is_revenue_share_eligible?: boolean | null
          name: string
          sort_order?: number | null
        }
        Update: {
          category_group?: string
          created_at?: string | null
          id?: number
          is_revenue_share_eligible?: boolean | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      service_items: {
        Row: {
          category_id: number | null
          created_at: string | null
          excel_category: string | null
          id: number
          name: string
          product_code: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          excel_category?: string | null
          id?: number
          name: string
          product_code?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          excel_category?: string | null
          id?: number
          name?: string
          product_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_audit_log: {
        Row: {
          created_at: string | null
          error_message: string | null
          external_id: string | null
          id: number
          internal_id: string | null
          operation: string
          payload: Json | null
          source_system: string
          status: string | null
          table_name: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          external_id?: string | null
          id?: number
          internal_id?: string | null
          operation: string
          payload?: Json | null
          source_system: string
          status?: string | null
          table_name: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          external_id?: string | null
          id?: number
          internal_id?: string | null
          operation?: string
          payload?: Json | null
          source_system?: string
          status?: string | null
          table_name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean
          must_change_password: boolean
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          must_change_password?: boolean
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          must_change_password?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      appointment_patient_resolution: {
        Row: {
          agent_name: string | null
          appointment_date: string | null
          appointment_id: number | null
          appointment_status: string | null
          appointment_time: string | null
          campaign_name: string | null
          confirmation_status: string | null
          direct_patient_id: number | null
          doctor_id: number | null
          doctor_service: string | null
          lead_id: number | null
          lead_name: string | null
          lead_phone: string | null
          lead_source: string | null
          main_problem: string | null
          notes: string | null
          phone_normalized: string | null
          resolved_patient_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "crm_appointments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      calendar_agent_performance_today: {
        Row: {
          agent_name: string | null
          mo_confirmed: number | null
          mo_total: number | null
          nb_confirmed: number | null
          nb_total: number | null
          total_calls: number | null
          total_confirmed: number | null
        }
        Relationships: []
      }
      calendar_appointment_detail: {
        Row: {
          appointment_date: string | null
          appointment_id: number | null
          appointment_status: string | null
          appointment_time: string | null
          confirmation_status: string | null
          doctor_service: string | null
          hn: string | null
          hospital_patient_id: string | null
          location: string | null
          mo_agent: string | null
          mo_called_at: string | null
          mo_outcome: string | null
          morning_of_status: string | null
          nb_agent: string | null
          nb_called_at: string | null
          nb_outcome: string | null
          night_before_status: string | null
          no_show_risk: string | null
          notes: string | null
          patient_id: number | null
          patient_name: string | null
          patient_type: string | null
          phone: string | null
          service_type: string | null
        }
        Relationships: []
      }
      calendar_call_center_today: {
        Row: {
          completed: number | null
          confirmation_rate_pct: number | null
          confirmed: number | null
          reached: number | null
          reschedule_requests: number | null
          total_calls: number | null
        }
        Relationships: []
      }
      calendar_day_summary: {
        Row: {
          appointment_date: string | null
          confirmed_count: number | null
          doctors_list: string[] | null
          doctors_scheduled: number | null
          no_show_count: number | null
          no_show_risk_count: number | null
          pending_count: number | null
          total_count: number | null
        }
        Relationships: []
      }
      calendar_day_type_summary: {
        Row: {
          appointment_date: string | null
          appt_type: string | null
          cnt: number | null
        }
        Relationships: []
      }
      calendar_summary_view: {
        Row: {
          appointment_date: string | null
          booked_count: number | null
          cancelled_count: number | null
          completed_count: number | null
          confirmed_count: number | null
          no_show_count: number | null
          rescheduled_count: number | null
          total_count: number | null
        }
        Relationships: []
      }
      calendar_tomorrow_kpi: {
        Row: {
          doctors_scheduled: number | null
          morning_confirmed: number | null
          night_before_confirmed: number | null
          no_show_risk: number | null
          pending_calls: number | null
          total_patients: number | null
        }
        Relationships: []
      }
      daily_callback_queue: {
        Row: {
          appointment_date: string | null
          appointment_final_status: string | null
          appointment_id: number | null
          appointment_time: string | null
          assigned_to: string | null
          call_category: string | null
          call_source: string | null
          completed_followups: number | null
          created_at: string | null
          days_overdue: number | null
          doctor_name: string | null
          due_at: string | null
          followup_number: number | null
          id: string | null
          internal_lead_category: string | null
          is_overdue: boolean | null
          last_called_at: string | null
          last_outcome: string | null
          lead_category: string | null
          lead_id: number | null
          log_date: string | null
          max_followups: number | null
          mobile_e164: string | null
          next_followup_at: string | null
          normalized_phone: string | null
          patient_id: number | null
          patient_name: string | null
          phone: string | null
          priority_label: string | null
          priority_rank: number | null
          reason: string | null
          relevant_date: string | null
          source_of_appointment: string | null
          status: string | null
          task_type: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "callback_tasks_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      day_detail_appointments_view: {
        Row: {
          agent_name: string | null
          appointment_date: string | null
          appointment_id: number | null
          appointment_time: string | null
          confirmation_status: string | null
          doctor_service: string | null
          hospital_patient_id: string | null
          invoice_validated: boolean | null
          last_visit_date: string | null
          lead_source: string | null
          main_problem: string | null
          matched_admission_an: string | null
          next_appointment_date: string | null
          next_appointment_doctor: string | null
          notes: string | null
          patient_area: string | null
          patient_hn: string | null
          patient_id: number | null
          patient_name: string | null
          phone: string | null
          total_visits: number | null
          validated_status: string | null
        }
        Relationships: []
      }
      doctor_visit_summary: {
        Row: {
          appointment_date: string | null
          completed_count: number | null
          doctor_service: string | null
          no_show_count: number | null
          pending_count: number | null
          total_count: number | null
        }
        Relationships: []
      }
      meta_offline_export_dashboard: {
        Row: {
          count_events: number | null
          event_name: string | null
          max_event_time: string | null
          meta_route: string | null
          min_event_time: string | null
          source_path: string | null
          status: string | null
          total_value: number | null
        }
        Relationships: []
      }
      meta_offline_revenue_attribution_summary: {
        Row: {
          average_revenue_per_invoice: number | null
          excluded_count: number | null
          export_ready_count: number | null
          invoice_count: number | null
          lead_count: number | null
          matched_patient_count: number | null
          source_path: string | null
          total_revenue: number | null
        }
        Relationships: []
      }
      meta_screening_attribution_candidates: {
        Row: {
          admission_id: number | null
          currency: string | null
          event_type_internal: string | null
          export_ready: boolean | null
          invoice_date: string | null
          matched_confidence: number | null
          matched_method: string | null
          meta_route: string | null
          net_amount: number | null
          normalized_phone: string | null
          patient_id: number | null
          patient_name_internal: string | null
          source_lead_id: number | null
        }
        Relationships: []
      }
      meta_send_ready_events: {
        Row: {
          action_source: string | null
          city: string | null
          country: string | null
          currency: string | null
          email: string | null
          event_id: string | null
          event_name: string | null
          event_time: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          meta_route: string | null
          normalized_phone: string | null
          source_path: string | null
          value: number | null
        }
        Insert: {
          action_source?: string | null
          city?: string | null
          country?: string | null
          currency?: string | null
          email?: string | null
          event_id?: string | null
          event_name?: string | null
          event_time?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          meta_route?: string | null
          normalized_phone?: string | null
          source_path?: string | null
          value?: number | null
        }
        Update: {
          action_source?: string | null
          city?: string | null
          country?: string | null
          currency?: string | null
          email?: string | null
          event_id?: string | null
          event_name?: string | null
          event_time?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          meta_route?: string | null
          normalized_phone?: string | null
          source_path?: string | null
          value?: number | null
        }
        Relationships: []
      }
      meta_wound_attribution_candidates: {
        Row: {
          admission_id: number | null
          currency: string | null
          event_type_internal: string | null
          export_ready: boolean | null
          invoice_date: string | null
          matched_confidence: number | null
          matched_method: string | null
          meta_route: string | null
          net_amount: number | null
          normalized_phone: string | null
          patient_id: number | null
          patient_name_internal: string | null
          source_lead_id: number | null
        }
        Relationships: []
      }
      no_show_follow_up_queue_view: {
        Row: {
          appointment_id: number | null
          follow_up_count: number | null
          last_appointment_status: string | null
          last_call_attempt_date: string | null
          latest_outcome: string | null
          missed_appointment_date: string | null
          next_follow_up_date: string | null
          patient_id: number | null
          patient_name: string | null
          patient_type: string | null
          phone: string | null
          priority_rank: number | null
        }
        Relationships: []
      }
      no_show_followup_view: {
        Row: {
          agent_name: string | null
          appointment_date: string | null
          appointment_id: number | null
          appointment_time: string | null
          campaign_name: string | null
          confirmation_status: string | null
          days_since_appointment: number | null
          doctor_service: string | null
          hospital_patient_id: string | null
          lead_source: string | null
          main_problem: string | null
          notes: string | null
          patient_area: string | null
          patient_hn: string | null
          patient_name: string | null
          phone: string | null
        }
        Relationships: []
      }
      outgoing_call_agent_performance: {
        Row: {
          agent_name: string | null
          attempts: number | null
          booked: number | null
          booking_conversion_pct: number | null
          completed: number | null
          do_not_call: number | null
          not_interested: number | null
          reach_rate_pct: number | null
          reached: number | null
          scheduled_date: string | null
        }
        Relationships: []
      }
      outgoing_call_all_attempts_view: {
        Row: {
          assigned_agent: string | null
          attempt_id: number | null
          attempt_notes: string | null
          attempt_status: string | null
          callback_at: string | null
          called_at: string | null
          category: string | null
          category_rank: number | null
          final_location: string | null
          followup_number: number | null
          followups_done: number | null
          is_overdue: boolean | null
          lead_type: string | null
          max_followups: number | null
          outcome: string | null
          outcome_code: string | null
          patient_id: number | null
          patient_name: string | null
          phone: string | null
          queue_created_at: string | null
          queue_id: number | null
          queue_status: string | null
          reason: string | null
          relevant_date: string | null
          scheduled_date: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "outgoing_call_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "vw_no_show_recovery_queue"
            referencedColumns: ["queue_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      outgoing_call_funnel_metrics: {
        Row: {
          bookings: number | null
          category: string | null
          exhausted_entries: number | null
          queue_entries: number | null
          reached_attempts: number | null
          resolution_rate_pct: number | null
          resolved_entries: number | null
          total_attempts: number | null
        }
        Relationships: []
      }
      outgoing_call_history_view: {
        Row: {
          assigned_agent: string | null
          attempt_id: number | null
          called_at: string | null
          category: string | null
          followup_number: number | null
          notes: string | null
          outcome: string | null
          patient_id: number | null
          patient_name: string | null
          queue_id: number | null
          scheduled_date: string | null
          status: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "outgoing_call_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "vw_no_show_recovery_queue"
            referencedColumns: ["queue_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      outgoing_call_sheet_view: {
        Row: {
          assigned_agent: string | null
          attempt_id: number | null
          attempt_notes: string | null
          attempt_status: string | null
          callback_at: string | null
          called_at: string | null
          category: string | null
          category_rank: number | null
          final_location: string | null
          followup_number: number | null
          followups_done: number | null
          is_overdue: boolean | null
          lead_type: string | null
          max_followups: number | null
          no_show_risk: string | null
          outcome: string | null
          outcome_code: string | null
          patient_id: number | null
          patient_name: string | null
          phone: string | null
          pinned_to_top: boolean | null
          queue_created_at: string | null
          queue_id: number | null
          queue_status: string | null
          reason: string | null
          relevant_date: string | null
          scheduled_date: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "outgoing_call_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_attempts_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "vw_no_show_recovery_queue"
            referencedColumns: ["queue_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      outgoing_call_today_metrics: {
        Row: {
          booked: number | null
          completed_today: number | null
          overdue_callbacks: number | null
          pending_calls: number | null
          reached: number | null
        }
        Relationships: []
      }
      patient_master_view: {
        Row: {
          area: string | null
          billing_category: string | null
          crm_category: string | null
          dhaka_status: string | null
          first_lead_date: string | null
          first_visit_date: string | null
          follow_up_count: number | null
          healing_status: string | null
          hospital_id: string | null
          hospital_patient_id: string | null
          last_appointment_date: string | null
          last_appointment_status: string | null
          last_call_outcome: string | null
          last_call_status: string | null
          last_note: string | null
          last_visit_date: string | null
          no_show_count: number | null
          patient_category: string | null
          patient_id: number | null
          patient_name: string | null
          patient_type: string | null
          phone: string | null
          phone_e164: string | null
          secondary_phone: string | null
          total_appointments: number | null
          total_visits: number | null
        }
        Relationships: []
      }
      patient_search_view: {
        Row: {
          hospital_patient_id: string | null
          last_appointment_date: string | null
          last_appointment_status: string | null
          last_call_outcome: string | null
          last_note: string | null
          lead_id: number | null
          lead_status: string | null
          no_show_count: number | null
          patient_id: number | null
          patient_name: string | null
          patient_type: string | null
          phone: string | null
          phone_normalized: string | null
          total_appointments: number | null
        }
        Relationships: []
      }
      patient_visit_summary: {
        Row: {
          area: string | null
          full_name: string | null
          hn: string | null
          hospital_patient_id: string | null
          last_visit_date: string | null
          next_appointment_date: string | null
          next_appointment_doctor: string | null
          patient_id: number | null
          patient_type: string | null
          phone: string | null
          phone_e164: string | null
          total_visits: number | null
        }
        Insert: {
          area?: string | null
          full_name?: string | null
          hn?: string | null
          hospital_patient_id?: string | null
          last_visit_date?: never
          next_appointment_date?: never
          next_appointment_doctor?: never
          patient_id?: number | null
          patient_type?: string | null
          phone?: string | null
          phone_e164?: string | null
          total_visits?: never
        }
        Update: {
          area?: string | null
          full_name?: string | null
          hn?: string | null
          hospital_patient_id?: string | null
          last_visit_date?: never
          next_appointment_date?: never
          next_appointment_doctor?: never
          patient_id?: number | null
          patient_type?: string | null
          phone?: string | null
          phone_e164?: string | null
          total_visits?: never
        }
        Relationships: []
      }
      today_appointments_view: {
        Row: {
          appointment_date: string | null
          appointment_id: number | null
          appointment_status: string | null
          appointment_time: string | null
          confirmation_status: string | null
          doctor_service: string | null
          hospital_patient_id: string | null
          invoice_validated: boolean | null
          matched_admission_an: string | null
          notes: string | null
          patient_hn: string | null
          patient_id: number | null
          patient_name: string | null
          patient_type: string | null
          phone: string | null
          source: string | null
          validated_status: string | null
        }
        Relationships: []
      }
      v_call_center_agent_performance_billing: {
        Row: {
          attributed_collected: number | null
          attributed_invoices: number | null
          attributed_line_item_revenue: number | null
          attributed_net_bill: number | null
          call_center_person: string | null
          first_revenue_date: string | null
          last_revenue_date: string | null
          linked_leads: number | null
          linked_patients: number | null
        }
        Relationships: []
      }
      v_call_center_invoice_attribution: {
        Row: {
          ad_campaign: string | null
          appointment_final_status: string | null
          appointment_status: string | null
          attribution_window_days: number | null
          call_category: string | null
          call_center_person: string | null
          call_log_id: number | null
          crm_patient_name: string | null
          hn: string | null
          internal_lead_category: string | null
          invoice_date: string | null
          invoice_id: number | null
          invoice_no: string | null
          invoice_type: string | null
          lead_source: string | null
          line_item_amount_sum: number | null
          log_date: string | null
          match_confidence: number | null
          match_method: string | null
          matched_patient_name: string | null
          mobile_e164: string | null
          net_bill: number | null
          patient_id: number | null
          reconciliation_status: string | null
          total_collected: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "fk_meta_matched_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      v_call_center_staff_performance: {
        Row: {
          appointments_booked: number | null
          booking_rate_pct: number | null
          call_center_person: string | null
          first_log_date: string | null
          last_log_date: string | null
          no_shows: number | null
          not_interested: number | null
          total_calls: number | null
        }
        Relationships: []
      }
      v_call_center_unmatched_leads: {
        Row: {
          ad_campaign: string | null
          call_center_person: string | null
          call_log_id: number | null
          data_quality_notes: string | null
          internal_lead_category: string | null
          lead_source: string | null
          log_date: string | null
          matched_confidence: number | null
          matched_method: string | null
          mobile_e164: string | null
          mobile_raw: string | null
          patient_id_raw: string | null
          patient_name: string | null
        }
        Insert: {
          ad_campaign?: string | null
          call_center_person?: string | null
          call_log_id?: number | null
          data_quality_notes?: string | null
          internal_lead_category?: string | null
          lead_source?: string | null
          log_date?: string | null
          matched_confidence?: number | null
          matched_method?: string | null
          mobile_e164?: string | null
          mobile_raw?: string | null
          patient_id_raw?: string | null
          patient_name?: string | null
        }
        Update: {
          ad_campaign?: string | null
          call_center_person?: string | null
          call_log_id?: number | null
          data_quality_notes?: string | null
          internal_lead_category?: string | null
          lead_source?: string | null
          log_date?: string | null
          matched_confidence?: number | null
          matched_method?: string | null
          mobile_e164?: string | null
          mobile_raw?: string | null
          patient_id_raw?: string | null
          patient_name?: string | null
        }
        Relationships: []
      }
      v_call_patient_match_candidates: {
        Row: {
          appointment_final_status: string | null
          best_match_method: string | null
          best_patient_id: number | null
          call_log_id: number | null
          call_name: string | null
          call_patient_id: string | null
          call_phone: string | null
          linked_admission_id: number | null
          log_date: string | null
          match_by_hn_name: string | null
          match_by_hn_patient_id: number | null
          match_by_phone_hn: string | null
          match_by_phone_name: string | null
          match_by_phone_patient_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "call_center_logs_linked_admission_id_fkey"
            columns: ["linked_admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
        ]
      }
      v_call_source_performance: {
        Row: {
          ad_campaign: string | null
          appointment_rate_pct: number | null
          appointments_done: number | null
          call_source: string | null
          no_shows: number | null
          not_interested: number | null
          sheet_tab: string | null
          total_contacts: number | null
          tracked_revenue: number | null
          unique_patients_matched: number | null
        }
        Relationships: []
      }
      v_call_to_billing_conversion: {
        Row: {
          ad_campaign: string | null
          admission_id: number | null
          admission_status: string | null
          admission_type: string | null
          admitted_on: string | null
          appointment_final_status: string | null
          best_match_method: string | null
          call_center_person: string | null
          call_date: string | null
          call_log_id: number | null
          call_source: string | null
          converted_to_admission: boolean | null
          invoice_no: string | null
          net_bill: number | null
          patient_hn: string | null
          patient_name: string | null
          patient_phone: string | null
          sheet_tab: string | null
          total_collected: number | null
        }
        Relationships: []
      }
      v_daily_revenue: {
        Row: {
          activity_date: string | null
          admission_type: string | null
          sum_collected: number | null
          sum_discount: number | null
          sum_due: number | null
          sum_item_total: number | null
          sum_net_bill: number | null
          sum_refund: number | null
          sum_service_charge: number | null
          sum_total_bill: number | null
          total_admissions: number | null
        }
        Relationships: []
      }
      v_department_revenue_summary: {
        Row: {
          admission_count: number | null
          allocated_due: number | null
          department: string | null
          gross_line_amount: number | null
          invoice_count: number | null
          line_item_count: number | null
          net_bill: number | null
          patient_count: number | null
          total_collected: number | null
        }
        Relationships: []
      }
      v_doctor_payout_summary: {
        Row: {
          admission_count: number | null
          doctor_id: number | null
          doctor_name: string | null
          doctor_payout: number | null
          gross_revenue: number | null
          month: string | null
          rule_source: string | null
          service_category: string | null
        }
        Relationships: []
      }
      v_doctor_revenue: {
        Row: {
          admission_type: string | null
          doctor_id: number | null
          doctor_name: string | null
          month: string | null
          short_code: string | null
          total_cases: number | null
          total_collected: number | null
          total_net_bill: number | null
        }
        Relationships: []
      }
      v_doctor_share_calculation: {
        Row: {
          admission_id: number | null
          admitted_on: string | null
          an: string | null
          category_group: string | null
          doctor_id: number | null
          doctor_name: string | null
          doctor_share_amount: number | null
          line_amount: number | null
          particulars: string | null
          patient_name: string | null
          rule_source: string | null
          service_category: string | null
          share_percentage: number | null
        }
        Relationships: []
      }
      v_invoice_line_item_department_detail: {
        Row: {
          admission_id: number | null
          admitted_on: string | null
          category_group: string | null
          category_id: number | null
          collected_allocated_amount: number | null
          consultant: string | null
          doctor_id: number | null
          full_name: string | null
          hn: string | null
          invoice_date: string | null
          invoice_id: number | null
          invoice_no: string | null
          invoice_type: string | null
          item_type: string | null
          line_gross_amount: number | null
          line_item_id: number | null
          net_allocated_amount: number | null
          particulars: string | null
          patient_id: number | null
          qty: number | null
          rate: number | null
          reporting_department: string | null
          reporting_rule: string | null
          revenue_group: string | null
          service_category: string | null
          visit_department: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      v_invoice_line_item_source_of_truth: {
        Row: {
          admission_id: number | null
          amount: number | null
          an: string | null
          bed_name: string | null
          category: string | null
          cogs_total: number | null
          consultant_name_raw: string | null
          department: string | null
          discount_total: number | null
          doctor_share_pct: number | null
          hn: string | null
          inventory_class: string | null
          inventory_consumption_status: string | null
          inventory_qty: number | null
          inventory_sku: string | null
          inventory_unit: string | null
          invoice_date: string | null
          invoice_id: number | null
          invoice_no: string | null
          invoice_type: string | null
          is_inventory_item: boolean | null
          is_revenue_share_eligible: boolean | null
          item_total: number | null
          item_type: string | null
          line_date: string | null
          line_item_id: number | null
          line_needs_review: boolean | null
          line_review_reason: string | null
          line_seq: number | null
          net_amount: number | null
          net_bill: number | null
          normalized_particulars: string | null
          ocr_doc_url: string | null
          particulars: string | null
          patient_id: number | null
          patient_name_raw: string | null
          patient_phone: string | null
          payment_status: string | null
          pdf_url: string | null
          qty: number | null
          rate: number | null
          raw_category: string | null
          reconciliation_delta: number | null
          reconciliation_status: string | null
          service_charge_amt: number | null
          source_document_id: string | null
          total_collected: number | null
          total_due: number | null
          unit: string | null
          ward_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_source_document_id_fkey"
            columns: ["source_document_id"]
            isOneToOne: false
            referencedRelation: "invoice_source_documents"
            referencedColumns: ["file_id"]
          },
        ]
      }
      v_invoice_product_usage_daily: {
        Row: {
          inventory_class: string | null
          inventory_unit: string | null
          invoice_count: number | null
          item_name: string | null
          item_type: string | null
          line_count: number | null
          sku: string | null
          total_cogs: number | null
          total_revenue: number | null
          total_usage_qty: number | null
          usage_date: string | null
        }
        Relationships: []
      }
      v_invoice_service_revenue_daily: {
        Row: {
          category: string | null
          invoice_count: number | null
          item_type: string | null
          line_count: number | null
          particulars: string | null
          service_date: string | null
          total_qty: number | null
          total_revenue: number | null
          total_service_charge: number | null
        }
        Relationships: []
      }
      v_invoice_summary: {
        Row: {
          admission_id: number | null
          admission_type: string | null
          admitted_on: string | null
          bed_name: string | null
          consultant: string | null
          department: string | null
          discharged_on: string | null
          discount: number | null
          hn: string | null
          invoice_no: string | null
          item_total: number | null
          net_bill: number | null
          patient_name: string | null
          payment_status: string | null
          phone: string | null
          service_charge: number | null
          status: string | null
          total_bill: number | null
          total_collected: number | null
          total_due: number | null
          total_refund: number | null
          total_vat: number | null
          urgent_fee: number | null
          ward_name: string | null
        }
        Relationships: []
      }
      v_invoice_validation_status: {
        Row: {
          delta_vs_item_total: number | null
          delta_vs_total_bill: number | null
          hn: string | null
          invoice_date: string | null
          invoice_id: number | null
          invoice_no: string | null
          invoice_type: string | null
          item_total: number | null
          line_item_amount_sum: number | null
          needs_review: boolean | null
          net_bill: number | null
          parsed_line_item_count: number | null
          patient_id: number | null
          patient_name_raw: string | null
          reconciliation_status: string | null
          service_charge_total: number | null
          total_bill: number | null
          total_collected: number | null
          validation_status: string | null
        }
        Insert: {
          delta_vs_item_total?: never
          delta_vs_total_bill?: never
          hn?: string | null
          invoice_date?: string | null
          invoice_id?: number | null
          invoice_no?: string | null
          invoice_type?: string | null
          item_total?: number | null
          line_item_amount_sum?: number | null
          needs_review?: boolean | null
          net_bill?: number | null
          parsed_line_item_count?: number | null
          patient_id?: number | null
          patient_name_raw?: string | null
          reconciliation_status?: string | null
          service_charge_total?: number | null
          total_bill?: number | null
          total_collected?: number | null
          validation_status?: never
        }
        Update: {
          delta_vs_item_total?: never
          delta_vs_total_bill?: never
          hn?: string | null
          invoice_date?: string | null
          invoice_id?: number | null
          invoice_no?: string | null
          invoice_type?: string | null
          item_total?: number | null
          line_item_amount_sum?: number | null
          needs_review?: boolean | null
          net_bill?: number | null
          parsed_line_item_count?: number | null
          patient_id?: number | null
          patient_name_raw?: string | null
          reconciliation_status?: string | null
          service_charge_total?: number | null
          total_bill?: number | null
          total_collected?: number | null
          validation_status?: never
        }
        Relationships: [
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      v_line_item_detail: {
        Row: {
          admission_date: string | null
          admission_type: string | null
          amount: number | null
          category_group: string | null
          consultant: string | null
          hn: string | null
          invoice_no: string | null
          line_date: string | null
          particulars: string | null
          patient_name: string | null
          qty: number | null
          rate: number | null
          service_category: string | null
          service_charge_amt: number | null
        }
        Relationships: []
      }
      v_patient_billing_profile: {
        Row: {
          first_invoice_date: string | null
          full_name: string | null
          gender: string | null
          hn: string | null
          invoice_count: number | null
          last_invoice_date: string | null
          lifetime_collected: number | null
          lifetime_line_item_revenue: number | null
          lifetime_net_bill: number | null
          line_item_count: number | null
          patient_id: number | null
          phone: string | null
          phone_e164: string | null
        }
        Relationships: []
      }
      v_patient_department_activity: {
        Row: {
          admission_count: number | null
          department: string | null
          first_seen_at: string | null
          full_name: string | null
          hn: string | null
          last_seen_at: string | null
          net_bill: number | null
          patient_id: number | null
          primary_department_bucket: string | null
          total_collected: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      v_patient_identity_resolution: {
        Row: {
          full_name: string | null
          gender: string | null
          hn: string | null
          identity_key_count: number | null
          invoice_count: number | null
          last_invoice_date: string | null
          lifetime_collected: number | null
          lifetime_net_bill: number | null
          patient_id: number | null
          phone_e164: string | null
        }
        Relationships: []
      }
      v_patient_line_item_department_activity: {
        Row: {
          admission_count: number | null
          collected: number | null
          department: string | null
          first_seen_at: string | null
          full_name: string | null
          hn: string | null
          invoice_count: number | null
          last_seen_at: string | null
          net_bill: number | null
          patient_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      v_patient_ltv: {
        Row: {
          address: string | null
          admission_per_call_pct: number | null
          appointments_booked: number | null
          ever_converted: boolean | null
          first_admission: string | null
          first_call_date: string | null
          full_name: string | null
          hn: string | null
          last_admission: string | null
          last_call_date: string | null
          lifetime_collected: number | null
          lifetime_value: number | null
          no_shows: number | null
          patient_id: number | null
          phone: string | null
          primary_ad_campaign: string | null
          primary_call_source: string | null
          total_admissions: number | null
          total_calls: number | null
        }
        Relationships: []
      }
      v_patient_summary: {
        Row: {
          address: string | null
          daycare_visits: number | null
          first_visit: string | null
          full_name: string | null
          gender: string | null
          hn: string | null
          ipd_visits: number | null
          last_visit: string | null
          lifetime_collected: number | null
          lifetime_due: number | null
          lifetime_net_bill: number | null
          patient_id: number | null
          phone: string | null
          total_visits: number | null
        }
        Relationships: []
      }
      v_payment_collections_daily: {
        Row: {
          collection_date: string | null
          collector: string | null
          pay_type: string | null
          total_amount: number | null
          transaction_count: number | null
        }
        Relationships: []
      }
      v_service_category_revenue: {
        Row: {
          admission_count: number | null
          admission_type: string | null
          category_group: string | null
          month: string | null
          service_category: string | null
          total_amount: number | null
          total_qty: number | null
          total_service_charge: number | null
        }
        Relationships: []
      }
      v_visit_department_revenue_summary: {
        Row: {
          admission_count: number | null
          department: string | null
          discounts: number | null
          gross_bill: number | null
          invoice_count: number | null
          net_bill: number | null
          patient_count: number | null
          total_collected: number | null
          total_due: number | null
        }
        Relationships: []
      }
      validated_appointments: {
        Row: {
          agent_name: string | null
          appointment_date: string | null
          appointment_id: number | null
          appointment_status: string | null
          appointment_time: string | null
          campaign_name: string | null
          confirmation_status: string | null
          direct_patient_id: number | null
          doctor_id: number | null
          doctor_service: string | null
          hospital_patient_id: string | null
          invoice_validated: boolean | null
          lead_id: number | null
          lead_name: string | null
          lead_phone: string | null
          lead_source: string | null
          main_problem: string | null
          matched_admission_an: string | null
          matched_admission_date: string | null
          notes: string | null
          patient_area: string | null
          patient_full_name: string | null
          patient_hn: string | null
          patient_phone: string | null
          patient_phone_e164: string | null
          patient_record_type: string | null
          phone_normalized: string | null
          resolved_patient_id: number | null
          validated_status: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "crm_appointments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "crm_appointments_patient_id_fkey"
            columns: ["direct_patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      vw_ad_performance_with_crm: {
        Row: {
          best_available_attribution: string | null
          campaign_bucket: string | null
          clicks: number | null
          conversations: number | null
          cpm_usd: number | null
          cpr_usd: number | null
          ctr_pct: number | null
          date: string | null
          exclude_from_benchmarks: boolean | null
          impressions: number | null
          internal_type_code: string | null
          meta_ad_id: string | null
          meta_ad_name: string | null
          meta_adset_id: string | null
          meta_campaign_id: string | null
          meta_campaign_name: string | null
          reach: number | null
          spend_usd: number | null
        }
        Relationships: []
      }
      vw_call_center_marketing_outcomes: {
        Row: {
          agent_name: string | null
          appointments_attended: number | null
          appointments_booked: number | null
          campaign_bucket: string | null
          date: string | null
          lead_category: string | null
          leads_handled: number | null
          no_shows: number | null
          revenue_bdt: number | null
        }
        Relationships: []
      }
      vw_finance_daily_summary: {
        Row: {
          adjusted_contribution_margin: number | null
          collected_revenue: number | null
          contribution_margin: number | null
          direct_cost_total: number | null
          discount_total: number | null
          doctor_share_total: number | null
          gross_revenue: number | null
          invoice_count: number | null
          net_revenue: number | null
          outstanding_revenue: number | null
          patient_count: number | null
          period_date: string | null
          period_start: string | null
          refund_total: number | null
        }
        Relationships: []
      }
      vw_finance_department_summary: {
        Row: {
          avg_invoice_value: number | null
          collected_revenue: number | null
          contribution_margin: number | null
          contribution_margin_pct: number | null
          department: string | null
          discount_total: number | null
          doctor_share_total: number | null
          gross_revenue: number | null
          invoice_count: number | null
          net_revenue: number | null
          outstanding_revenue: number | null
          patient_count: number | null
          refund_total: number | null
        }
        Relationships: []
      }
      vw_finance_doctor_share_summary: {
        Row: {
          contribution_after_share: number | null
          contribution_margin_pct: number | null
          doctor_id: number | null
          doctor_name: string | null
          doctor_share_amount: number | null
          doctor_specialty: string | null
          gross_revenue_attributed: number | null
          invoice_count: number | null
          net_revenue_attributed: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
        ]
      }
      vw_finance_invoice_summary: {
        Row: {
          adjusted_contribution_margin: number | null
          admission_id: number | null
          admitted_on: string | null
          collected_amount: number | null
          contribution_margin: number | null
          contribution_margin_pct: number | null
          created_at: string | null
          department: string | null
          direct_cost_total: number | null
          discharged_on: string | null
          discount_amount: number | null
          doctor_id: number | null
          doctor_name: string | null
          doctor_share_total: number | null
          doctor_specialty: string | null
          gross_amount: number | null
          invoice_date: string | null
          invoice_id: number | null
          invoice_no: string | null
          invoice_status: string | null
          invoice_type: string | null
          needs_review: boolean | null
          net_amount: number | null
          outstanding_amount: number | null
          patient_id: number | null
          patient_name: string | null
          patient_phone: string | null
          patient_type: string | null
          payment_status: string | null
          reconciliation_delta: number | null
          reconciliation_status: string | null
          refund_amount: number | null
          review_reason: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_summary"
            referencedColumns: ["admission_id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      vw_finance_line_item_summary: {
        Row: {
          adjusted_contribution_margin: number | null
          category_group: string | null
          category_id: number | null
          category_name: string | null
          contribution_margin: number | null
          department: string | null
          direct_cost: number | null
          discount_amount: number | null
          doctor_id: number | null
          doctor_name: string | null
          doctor_share_amount: number | null
          doctor_share_pct: number | null
          doctor_specialty: string | null
          gross_amount: number | null
          invoice_date: string | null
          invoice_id: number | null
          invoice_no: string | null
          invoice_status: string | null
          is_revenue_share_eligible: boolean | null
          item_type: string | null
          line_item_id: number | null
          needs_review: boolean | null
          net_amount: number | null
          particulars: string | null
          patient_id: number | null
          patient_type: string | null
          payment_status: string | null
          qty: number | null
          rate: number | null
          review_reason: string | null
          service_item_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_department_detail"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_line_item_source_of_truth"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_invoice_validation_status"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "vw_finance_invoice_summary"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "invoice_line_items_service_item_id_fkey"
            columns: ["service_item_id"]
            isOneToOne: false
            referencedRelation: "service_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "v_doctor_revenue"
            referencedColumns: ["doctor_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      vw_finance_monthly_summary: {
        Row: {
          adjusted_contribution_margin: number | null
          collected_revenue: number | null
          contribution_margin: number | null
          direct_cost_total: number | null
          discount_total: number | null
          doctor_share_total: number | null
          gross_revenue: number | null
          invoice_count: number | null
          net_revenue: number | null
          outstanding_revenue: number | null
          patient_count: number | null
          period_label: string | null
          period_start: string | null
          refund_total: number | null
        }
        Relationships: []
      }
      vw_finance_patient_summary: {
        Row: {
          collected_revenue: number | null
          contribution_margin: number | null
          doctor_share_total: number | null
          first_visit_date: string | null
          gross_revenue: number | null
          invoice_count: number | null
          is_repeat_patient: boolean | null
          last_visit_date: string | null
          net_revenue: number | null
          outstanding_revenue: number | null
          patient_id: number | null
          patient_name: string | null
          patient_phone: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      vw_finance_reconciliation_issues: {
        Row: {
          detail: string | null
          issue_type: string | null
          record_id: string | null
          reference: string | null
        }
        Relationships: []
      }
      vw_finance_weekly_summary: {
        Row: {
          adjusted_contribution_margin: number | null
          collected_revenue: number | null
          contribution_margin: number | null
          direct_cost_total: number | null
          discount_total: number | null
          doctor_share_total: number | null
          gross_revenue: number | null
          invoice_count: number | null
          net_revenue: number | null
          outstanding_revenue: number | null
          patient_count: number | null
          period_end: string | null
          period_start: string | null
          refund_total: number | null
        }
        Relationships: []
      }
      vw_funnel_by_bucket: {
        Row: {
          appointments_attended: number | null
          appointments_booked: number | null
          campaign_bucket: string | null
          clicks: number | null
          crm_leads: number | null
          date: string | null
          impressions: number | null
          meta_conversations: number | null
          revenue_bdt: number | null
          spend_usd: number | null
        }
        Relationships: []
      }
      vw_lead_outcomes: {
        Row: {
          agent_name: string | null
          appointment_final_status: string | null
          appointment_status: string | null
          attended: boolean | null
          attribution_confidence: number | null
          attribution_id: string | null
          attribution_level: string | null
          booked: boolean | null
          call_center_log_id: number | null
          campaign_bucket: string | null
          internal_type_code: string | null
          lead_category: string | null
          lead_date: string | null
          lead_id: number | null
          location: string | null
          no_show: boolean | null
          revenue_bdt: number | null
          self_reported_source: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "call_center_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["source_lead_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_invoice_attribution"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_center_unmatched_leads"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_call_center_log_id_fkey"
            columns: ["call_center_log_id"]
            isOneToOne: false
            referencedRelation: "v_call_to_billing_conversion"
            referencedColumns: ["call_log_id"]
          },
          {
            foreignKeyName: "lead_attribution_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      vw_marketing_data_quality: {
        Row: {
          appointments_unlinked: number | null
          attended_without_revenue: number | null
          bucket_attribution_pct: number | null
          exact_attribution_pct: number | null
          last_crm_update: string | null
          last_invoice_import: string | null
          last_meta_sync: string | null
          leads_missing_phone: number | null
          unknown_source_leads: number | null
          unknown_source_pct: number | null
          unmapped_campaigns: number | null
        }
        Relationships: []
      }
      vw_marketing_executive_summary: {
        Row: {
          appointments_attended: number | null
          appointments_booked: number | null
          attribution_confidence_avg: number | null
          booking_rate: number | null
          campaign_bucket: string | null
          cost_per_attended_usd: number | null
          cost_per_booked_usd: number | null
          cost_per_lead_usd: number | null
          crm_leads: number | null
          internal_type_code: string | null
          meta_conversations: number | null
          no_shows: number | null
          revenue_bdt: number | null
          revenue_per_lead_bdt: number | null
          show_rate: number | null
          spend_usd: number | null
        }
        Relationships: []
      }
      vw_no_show_recovery_queue: {
        Row: {
          campaign_bucket: string | null
          category: string | null
          days_since: number | null
          followup_count: number | null
          last_relevant_date: string | null
          lead_type: string | null
          max_followups: number | null
          no_show_risk: string | null
          patient_id: number | null
          patient_name: string | null
          phone_e164: string | null
          pinned_to_top: boolean | null
          priority_score: number | null
          queue_id: number | null
          recommended_action: string | null
          status: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_screening_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "meta_wound_attribution_candidates"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "no_show_follow_up_queue_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_master_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_search_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_visit_summary"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_hn_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_call_patient_match_candidates"
            referencedColumns: ["match_by_phone_patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_billing_profile"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_identity_resolution"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_ltv"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "outgoing_call_queue_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "v_patient_summary"
            referencedColumns: ["patient_id"]
          },
        ]
      }
    }
    Functions: {
      append_ocr_invoice_lines_json: {
        Args: {
          p_clear_existing?: boolean
          p_invoice_no: string
          p_lines: Json
          p_parser_name?: string
          p_parser_version?: string
        }
        Returns: {
          invoice_no: string
          line_item_amount_sum: number
          line_items_deleted: number
          line_items_inserted: number
          reconciliation_status: string
        }[]
      }
      book_appointment: { Args: { payload: Json }; Returns: number }
      book_appointment_from_call: {
        Args: {
          p_agent_name?: string
          p_appointment_date: string
          p_appointment_time: string
          p_attempt_id: number
          p_branch: string
          p_doctor_service: string
          p_notes?: string
        }
        Returns: Json
      }
      bulk_upsert_doctor_schedules: { Args: { p_rows: Json }; Returns: Json }
      call_kpi_incoming_outcome_label: {
        Args: { p_lead_status: string }
        Returns: string
      }
      create_lead_for_patient: { Args: { payload: Json }; Returns: number }
      current_agent_label: { Args: never; Returns: string }
      enrich_pt_profile_chunk: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          chunk_limit: number
          chunk_offset: number
          ids_seen: number
          keys_upserted: number
          rows_updated: number
        }[]
      }
      generate_daily_callback_tasks: { Args: never; Returns: Json }
      generate_screening_meta_offline_events: {
        Args: { end_date: string; start_date: string }
        Returns: {
          duplicates_skipped: number
          events_created: number
        }[]
      }
      generate_weekly_meta_offline_events: {
        Args: never
        Returns: {
          duplicates_skipped: number
          excluded_count: number
          screening_events_created: number
          wound_events_created: number
        }[]
      }
      generate_wound_meta_offline_events: {
        Args: { end_date: string; start_date: string }
        Returns: {
          duplicates_skipped: number
          events_created: number
        }[]
      }
      get_admin_dashboard_metrics: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: Json
      }
      get_call_center_kpis: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: Json
      }
      get_executive_metrics: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: Json
      }
      get_login_history: {
        Args: { p_limit?: number }
        Returns: {
          email: string
          event: string
          full_name: string
          happened_at: string
          ip: string
        }[]
      }
      get_scheduled_agent: { Args: { p_date: string }; Returns: string }
      import_invoice_batch_from_ocr_invoice_numbers:
        | {
            Args: {
              p_first_sheet_row: number
              p_invoice_numbers: string[]
              p_sheet_id?: string
              p_sheet_name?: string
            }
            Returns: {
              discounts_inserted: number
              duplicate_rows: number
              invoices_inserted: number
              line_items_inserted: number
              matched_legacy_admissions: number
              ocr_rows_read: number
              payments_inserted: number
              source_documents_upserted: number
              unique_invoices: number
              unmatched_legacy_admissions: number
            }[]
          }
        | {
            Args: {
              p_first_sheet_row: number
              p_invoice_numbers: string[]
              p_sheet_id: string
              p_sheet_name: string
            }
            Returns: {
              discounts_inserted: number
              docs_upserted: number
              duplicate_rows: number
              invoices_inserted: number
              line_items_inserted: number
              matched_admissions: number
              payments_inserted: number
              sheet_rows: number
              unique_invoices: number
              unmatched_admissions: number
            }[]
          }
      import_invoice_batch_from_queue:
        | {
            Args: {
              p_first_sheet_row: number
              p_invoice_numbers: string[]
              p_sheet_id?: string
              p_sheet_name?: string
            }
            Returns: {
              discounts_inserted: number
              duplicate_rows: number
              invoices_inserted: number
              line_items_inserted: number
              payments_inserted: number
              sheet_rows_read: number
              source_documents_upserted: number
              unique_invoices: number
            }[]
          }
        | {
            Args: {
              p_first_sheet_row: number
              p_invoice_numbers: string[]
              p_sheet_id: string
              p_sheet_name: string
            }
            Returns: {
              discounts_inserted: number
              docs_upserted: number
              duplicate_rows: number
              invoices_inserted: number
              line_items_inserted: number
              payments_inserted: number
              sheet_rows: number
              unique_invoices: number
            }[]
          }
      import_ocr_invoice_aggregate_json: {
        Args: { p_headers: Json }
        Returns: {
          headers_read: number
          invoices_inserted: number
          invoices_updated: number
          line_items_deleted: number
          line_items_inserted: number
          patients_upserted: number
          source_documents_upserted: number
        }[]
      }
      import_ocr_only_invoice_json: {
        Args: { p_headers: Json; p_lines: Json }
        Returns: {
          headers_read: number
          invoices_inserted: number
          invoices_updated: number
          line_items_deleted: number
          line_items_inserted: number
          patients_upserted: number
          source_documents_upserted: number
        }[]
      }
      insert_invoice_payments_json: {
        Args: { p_payments: Json }
        Returns: {
          amount_inserted: number
          payment_rows_inserted: number
        }[]
      }
      is_active_staff: { Args: never; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      link_or_update_appointment_patient: {
        Args: {
          p_appointment_id: number
          p_full_name: string
          p_hn?: string
          p_phone: string
        }
        Returns: Json
      }
      log_follow_up_attempt: { Args: { payload: Json }; Returns: number }
      match_call_center_logs_to_patients: {
        Args: { dry_run?: boolean }
        Returns: {
          avg_confidence: number
          pass: string
          rows_updated: number
        }[]
      }
      name_similarity_score: { Args: { a: string; b: string }; Returns: number }
      normalize_bd_phone: { Args: { raw: string }; Returns: string }
      normalize_invoice_text: { Args: { p_text: string }; Returns: string }
      populate_outgoing_call_queue: { Args: { p_date?: string }; Returns: Json }
      rebuild_cbl: {
        Args: never
        Returns: {
          rows_inserted: number
        }[]
      }
      recent_ocr_summary: {
        Args: { p_end: number; p_start: number }
        Returns: {
          gross: number
          line_rows: number
          matched_rows: number
          max_row: number
          min_row: number
          mismatch_rows: number
          net: number
          review_rows: number
          rows_in_scope: number
        }[]
      }
      record_appointment_status_change: {
        Args: {
          p_agent_name: string
          p_appointment_id: number
          p_field: string
          p_notes?: string
          p_value: string
        }
        Returns: Json
      }
      record_call_attempt_outcome:
        | {
            Args: {
              p_attempt_id: number
              p_notes?: string
              p_outcome: string
              p_resolve?: boolean
              p_status: string
              p_wait_days?: number
            }
            Returns: Json
          }
        | {
            Args: {
              p_agent_name?: string
              p_attempt_id: number
              p_callback_at?: string
              p_confirmed?: boolean
              p_notes?: string
              p_outcome: string
              p_outcome_code?: string
              p_resolve?: boolean
              p_status: string
              p_wait_days?: number
            }
            Returns: Json
          }
      record_confirmation_call: {
        Args: {
          p_agent_name: string
          p_appointment_id: number
          p_attempt?: number
          p_call_type: string
          p_notes?: string
          p_outcome: string
          p_patient_id: number
        }
        Returns: Json
      }
      refresh_invoice_reconciliation: {
        Args: { p_invoice_id: number }
        Returns: undefined
      }
      refresh_patient_and_crm_billing_links: {
        Args: never
        Returns: {
          rows_affected: number
          step: string
        }[]
      }
      refresh_patients_from_line_item_source_truth_chunk: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          chunk_limit: number
          chunk_offset: number
          line_items_patient_synced: number
          patient_rows_updated: number
          patients_in_chunk: number
        }[]
      }
      reschedule_appointment: {
        Args: { new_date: string; new_time: string; old_appointment_id: number }
        Returns: number
      }
      reverse_confirmation_call: {
        Args: {
          p_agent_name?: string
          p_appointment_id: number
          p_call_type: string
        }
        Returns: Json
      }
      run_cc_match: {
        Args: never
        Returns: {
          n: number
          score: number
          step: string
        }[]
      }
      run_li_chunk_refresh: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          chunk_limit: number
          chunk_offset: number
          ids_seen: number
          line_rows_changed: number
          rows_changed: number
        }[]
      }
      run_li_id_only_chunk_sync: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          chunk_limit: number
          chunk_offset: number
          ids_seen: number
          invoices_synced: number
          line_items_synced: number
        }[]
      }
      save_lead_intake: { Args: { payload: Json }; Returns: Json }
      search_patient_by_phone: { Args: { phone_input: string }; Returns: Json }
      sync_appointment_status_from_invoices: {
        Args: { p_only_pending?: boolean; p_since_date?: string }
        Returns: number
      }
      update_appointment_status: {
        Args: {
          p_appointment_id: number
          p_confirmation_status: string
          p_notes: string
          p_status: string
        }
        Returns: undefined
      }
      update_hospital_patient_id: {
        Args: { p_hospital_patient_id: string; p_patient_id: number }
        Returns: undefined
      }
      update_patient_hn: {
        Args: { p_new_hn: string; p_patient_id: number }
        Returns: Json
      }
      upsert_patient_from_intake: { Args: { payload: Json }; Returns: number }
      upsert_pt_contacts_from_ocr_json: {
        Args: { p_headers: Json }
        Returns: {
          headers_seen: number
          invoices_touched: number
          keys_touched: number
          pt_rows_touched: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
