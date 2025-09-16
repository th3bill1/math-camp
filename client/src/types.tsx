export type DateISO = string;

export interface Camp {
  title: string;
  posterUrl: string;
  dates: string[];
  logoUrl?: string;
}
export type GroupName = "młodsza" | "starsza" | "elita" | "wszyscy";

export interface TimetableSlot {
  start?: string;              // "08:00"
  end?: string;               // optional "14:00"
  title: string;              // event title
  type: "contest" | "lecture" | "workshop" | "meal" | "free_time" | "match" | "other";
  groups: string[];           // ["wszyscy", "elita", ...]
  duration: number | null;    // minutes
  approx?: boolean;           // ~start or duration
  location?: string;          // e.g. "Świetlica"
  notes?: string;             // any notes
  startCandidates?: string[]; // variant possible start times
}

export interface TimetableDay {
  label: string;              // "Środa", "Czwartek", etc.
  slots: TimetableSlot[];
}


export interface Scores {
  groups: string[];
  days: DateISO[];
  scores: Record<string, Record<DateISO, number>>;
}
export interface MatchGroup { name: string; tasks: { id: number; name: string; }[]; }