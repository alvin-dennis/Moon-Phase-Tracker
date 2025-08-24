import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Moon phase calculation utility
export function getMoonPhase(date: Date): {
  phase: number;
  name: string;
  emoji: string;
} {
  // Known new moon date (January 11, 2024)
  const knownNewMoon = new Date("2024-01-11T11:57:00Z");
  const lunarCycle = 29.53058867; // days

  const daysSinceNewMoon =
    (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phase = ((daysSinceNewMoon % lunarCycle) + lunarCycle) % lunarCycle;
  const normalizedPhase = phase / lunarCycle;

  let name: string;
  let emoji: string;

  if (normalizedPhase < 0.0625) {
    name = "New Moon";
    emoji = "🌑";
  } else if (normalizedPhase < 0.1875) {
    name = "Waxing Crescent";
    emoji = "🌒";
  } else if (normalizedPhase < 0.3125) {
    name = "First Quarter";
    emoji = "🌓";
  } else if (normalizedPhase < 0.4375) {
    name = "Waxing Gibbous";
    emoji = "🌔";
  } else if (normalizedPhase < 0.5625) {
    name = "Full Moon";
    emoji = "🌕";
  } else if (normalizedPhase < 0.6875) {
    name = "Waning Gibbous";
    emoji = "🌖";
  } else if (normalizedPhase < 0.8125) {
    name = "Last Quarter";
    emoji = "🌗";
  } else {
    name = "Waning Crescent";
    emoji = "🌘";
  }

  return { phase: normalizedPhase, name, emoji };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
