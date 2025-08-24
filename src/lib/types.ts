export interface MoonPhaseInfo {
  date: string;
  name: string;
  value: number;
}

export interface StormglassMoonPhase {
  text: string;
  time: string;
  value: number;
}

export interface StormglassDay {
  time: string;
  moonPhase?: {
    current?: StormglassMoonPhase;
    closest?: StormglassMoonPhase;
  };
  moonFraction?: number;
  moonrise?: string;
  moonset?: string;
}

export interface StormglassResponse {
  data: StormglassDay[];
  meta: Record<string, unknown>;
}
