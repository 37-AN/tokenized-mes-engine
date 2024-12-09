export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_insights: {
        Row: {
          confidence: number | null
          created_at: string | null
          device_id: string | null
          id: string
          insight_type: string
          message: string
          metadata: Json | null
          severity: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          device_id?: string | null
          id?: string
          insight_type: string
          message: string
          metadata?: Json | null
          severity?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          device_id?: string | null
          id?: string
          insight_type?: string
          message?: string
          metadata?: Json | null
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_insights_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "plc_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      annotation_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          data_item_id: string
          dataset_id: string | null
          id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          data_item_id: string
          dataset_id?: string | null
          id?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          data_item_id?: string
          dataset_id?: string | null
          id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "annotation_tasks_dataset_id_fkey"
            columns: ["dataset_id"]
            isOneToOne: false
            referencedRelation: "datasets"
            referencedColumns: ["id"]
          },
        ]
      }
      annotations: {
        Row: {
          annotation_data: Json
          annotator_id: string | null
          created_at: string | null
          id: string
          status: string
          task_id: string | null
          updated_at: string | null
        }
        Insert: {
          annotation_data: Json
          annotator_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          task_id?: string | null
          updated_at?: string | null
        }
        Update: {
          annotation_data?: Json
          annotator_id?: string | null
          created_at?: string | null
          id?: string
          status?: string
          task_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "annotations_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "annotation_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      arduino_plc_data: {
        Row: {
          data_type: string
          device_id: string | null
          id: string
          metadata: Json | null
          timestamp: string | null
          value: number
        }
        Insert: {
          data_type: string
          device_id?: string | null
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          value: number
        }
        Update: {
          data_type?: string
          device_id?: string | null
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "arduino_plc_data_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "plc_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      data_access_rights: {
        Row: {
          access_level: string
          asset_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          access_level: string
          asset_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          access_level?: string
          asset_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_access_rights_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "tokenized_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      datasets: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_type: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_type: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_type?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      device_configurations: {
        Row: {
          created_at: string | null
          id: string
          max_devices: number | null
          max_registers_per_device: number | null
          name: string
          owner_id: string | null
          register_types: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_devices?: number | null
          max_registers_per_device?: number | null
          name: string
          owner_id?: string | null
          register_types?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_devices?: number | null
          max_registers_per_device?: number | null
          name?: string
          owner_id?: string | null
          register_types?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      device_simulations: {
        Row: {
          created_at: string | null
          device_id: string
          id: string
          is_running: boolean | null
          parameters: Json | null
          simulation_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          id?: string
          is_running?: boolean | null
          parameters?: Json | null
          simulation_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          id?: string
          is_running?: boolean | null
          parameters?: Json | null
          simulation_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mes_metrics: {
        Row: {
          device_id: string | null
          id: string
          metadata: Json | null
          metric_type: string
          timestamp: string | null
          unit: string | null
          value: number
        }
        Insert: {
          device_id?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          timestamp?: string | null
          unit?: string | null
          value: number
        }
        Update: {
          device_id?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          timestamp?: string | null
          unit?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "mes_metrics_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "plc_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      plc_devices: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          ip_address: string | null
          is_active: boolean | null
          name: string
          owner_id: string | null
          port: number | null
          protocol: string | null
          rack: number | null
          slave_id: number | null
          slot: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          name: string
          owner_id?: string | null
          port?: number | null
          protocol?: string | null
          rack?: number | null
          slave_id?: number | null
          slot?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          name?: string
          owner_id?: string | null
          port?: number | null
          protocol?: string | null
          rack?: number | null
          slave_id?: number | null
          slot?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      plc_registers: {
        Row: {
          address: number
          created_at: string | null
          description: string | null
          id: string
          initial_value: number | null
          max_value: number | null
          min_value: number | null
          plc_id: string | null
          register_type: string
          updated_at: string | null
        }
        Insert: {
          address: number
          created_at?: string | null
          description?: string | null
          id?: string
          initial_value?: number | null
          max_value?: number | null
          min_value?: number | null
          plc_id?: string | null
          register_type: string
          updated_at?: string | null
        }
        Update: {
          address?: number
          created_at?: string | null
          description?: string | null
          id?: string
          initial_value?: number | null
          max_value?: number | null
          min_value?: number | null
          plc_id?: string | null
          register_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plc_registers_plc_id_fkey"
            columns: ["plc_id"]
            isOneToOne: false
            referencedRelation: "plc_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      quality_reviews: {
        Row: {
          annotation_id: string | null
          created_at: string | null
          feedback: string | null
          id: string
          reviewer_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          annotation_id?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          reviewer_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          annotation_id?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          reviewer_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_reviews_annotation_id_fkey"
            columns: ["annotation_id"]
            isOneToOne: false
            referencedRelation: "annotations"
            referencedColumns: ["id"]
          },
        ]
      }
      refined_industrial_data: {
        Row: {
          data_type: string
          device_id: string | null
          id: string
          metadata: Json | null
          quality_score: number | null
          timestamp: string | null
          value: number
        }
        Insert: {
          data_type: string
          device_id?: string | null
          id?: string
          metadata?: Json | null
          quality_score?: number | null
          timestamp?: string | null
          value: number
        }
        Update: {
          data_type?: string
          device_id?: string | null
          id?: string
          metadata?: Json | null
          quality_score?: number | null
          timestamp?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "refined_industrial_data_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "plc_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      token_transactions: {
        Row: {
          amount: number
          asset_id: string | null
          created_at: string | null
          from_address: string
          id: string
          status: string
          to_address: string
          transaction_hash: string | null
        }
        Insert: {
          amount: number
          asset_id?: string | null
          created_at?: string | null
          from_address: string
          id?: string
          status?: string
          to_address: string
          transaction_hash?: string | null
        }
        Update: {
          amount?: number
          asset_id?: string | null
          created_at?: string | null
          from_address?: string
          id?: string
          status?: string
          to_address?: string
          transaction_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "tokenized_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      tokenized_assets: {
        Row: {
          asset_type: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          owner_id: string
          price_per_token: number
          token_symbol: string
          total_supply: number
        }
        Insert: {
          asset_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          owner_id: string
          price_per_token?: number
          token_symbol: string
          total_supply?: number
        }
        Update: {
          asset_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          owner_id?: string
          price_per_token?: number
          token_symbol?: string
          total_supply?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
