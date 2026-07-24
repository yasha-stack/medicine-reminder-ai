export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  avatarUrl?: string;
  memberId: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  reminderTime: string; // e.g. "08:00"
  instructions: string; // e.g. "Take with food", "After lunch"
  remaining: number;
  total: number;
  refillReminder: boolean;
  refillThreshold: number; // e.g. 5
  photoUrl?: string;
  category: string; // e.g. "Anti-Diabetic", "Vitamin", "Cardiovascular"
  createdAt: string;
}

export interface DoseLog {
  id: string;
  medicationId: string;
  time: string; // e.g. "08:00"
  date: string; // e.g. "2024-06-14"
  status: 'taken' | 'pending' | 'later';
  loggedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}
