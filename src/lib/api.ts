import axios from "axios";
import type { MoonPhaseInfo, StormglassResponse } from "@/lib/types";

export function getMoonPhaseEmoji(name: string): string {
  if (!name) return "🌑";
  switch (name.toLowerCase()) {
    case "new moon":
      return "🌑";
    case "waxing crescent":
      return "🌒";
    case "first quarter":
      return "🌓";
    case "waxing gibbous":
      return "🌔";
    case "full moon":
      return "🌕";
    case "waning gibbous":
      return "🌖";
    case "last quarter":
      return "🌗";
    case "waning crescent":
      return "🌘";
    default:
      return "🌑";
  }
}

export function extractMoonPhasesOnly(apiResponse: unknown): MoonPhaseInfo[] {
  if (
    !apiResponse ||
    typeof apiResponse !== "object" ||
    !("data" in apiResponse)
  ) {
    return [];
  }
  const { data } = apiResponse as StormglassResponse;
  if (!Array.isArray(data)) return [];
  return data.map((day) => ({
    date: day.time,
    name: day.moonPhase?.current?.text ?? "",
    value: day.moonPhase?.current?.value ?? 0,
  }));
}

export async function fetchMoonPhases(
  lat: number,
  lng: number,
  apiKey: string
): Promise<StormglassResponse> {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const start = formatDate(today);
  const end = formatDate(endDate);

  const url = `https://api.stormglass.io/v2/astronomy/point?lat=${lat}&lng=${lng}&start=${start}&end=${end}`;

  if (!apiKey) {
    throw new Error("API key is required");
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: apiKey,
    },
  });
  return response.data;
}
