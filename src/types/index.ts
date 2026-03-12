export interface Profile {
  id: string
  username: string
  avatar_url: string | null
  bio: string | null
  region: string | null
  created_at: string
}

export interface Identification {
  id: string
  user_id: string
  image_url: string
  common_name: string
  scientific_name: string
  family: string | null
  description: string | null
  care_level: 'easy' | 'medium' | 'hard'
  watering_frequency: string
  sunlight: string
  region: string
  confidence: number
  created_at: string
}

export interface MyPlant {
  id: string
  user_id: string
  identification_id: string | null
  nickname: string
  image_url: string | null
  location: string | null
  acquired_at: string | null
  notes: string | null
  created_at: string
  identification?: Identification
}

export interface WateringSchedule {
  id: string
  user_id: string
  plant_id: string
  frequency_days: number
  last_watered: string
  next_watering: string
  reminder_enabled: boolean
  created_at: string
  plant?: MyPlant
}

export interface CompostSchedule {
  id: string
  user_id: string
  compost_type: string
  frequency_days: number
  last_applied: string
  next_application: string
  notes: string | null
  created_at: string
}

export interface ForumCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  post_count?: number
}

export interface ForumPost {
  id: string
  user_id: string
  category_id: string
  title: string
  content: string
  image_url: string | null
  views: number
  is_pinned: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
  author?: Profile
  category?: ForumCategory
  reply_count?: number
  last_reply?: {
    author: Profile
    created_at: string
  }
}

export interface ForumReply {
  id: string
  post_id: string
  user_id: string
  content: string
  is_solution: boolean
  created_at: string
  updated_at: string
  author?: Profile
}

export interface PlantDatabase {
  id: string
  common_name_es: string
  scientific_name: string
  family: string | null
  region: string
  description: string | null
  care_level: 'easy' | 'medium' | 'hard'
  watering: string
  sunlight: string
  image_url: string | null
}

export interface CalendarEvent {
  id: string
  type: 'watering' | 'compost'
  title: string
  date: string
  plant_id?: string
  plant_nickname?: string
}
