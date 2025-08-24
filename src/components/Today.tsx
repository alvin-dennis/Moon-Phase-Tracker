import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchMoonPhases,
  extractMoonPhasesOnly,
  getMoonPhaseEmoji,
} from "@/lib/api";
import type { MoonPhaseInfo } from "@/lib/types";

interface TodayProps {
  lat: number;
  lng: number;
  apiKey: string;
  showForecast: boolean;
  onToggleForecast: () => void;
  formatDate: (date: Date) => string;
}

export function Today({
  lat,
  lng,
  apiKey,
  showForecast,
  onToggleForecast,
  formatDate,
}: TodayProps) {
  const [todayPhase, setTodayPhase] = useState<MoonPhaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhase() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoonPhases(lat, lng, apiKey);
        const phases = extractMoonPhasesOnly(data);
        setTodayPhase(phases[0] || null);
      } catch (err) {
        setError("Failed to load moon phase");
        console.error("Moon phase API error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPhase();
  }, [lat, lng, apiKey]);

  const todayDate = todayPhase ? new Date(todayPhase.date) : new Date();
  const emoji = todayPhase ? getMoonPhaseEmoji(todayPhase.name) : "🌑";
  const phaseName = todayPhase ? todayPhase.name : "";
  const phaseValue = todayPhase ? todayPhase.value : 0;

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-light text-white">Today</CardTitle>
        <p className="text-gray-400 text-lg">{formatDate(todayDate)}</p>
      </CardHeader>
      <CardContent className="text-center space-y-8">
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : todayPhase ? (
          <>
            <div className="flex justify-center">
              <div className="text-9xl filter drop-shadow-lg">{emoji}</div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-light text-white tracking-wide">
                {phaseName}
              </h3>
              <p className="text-gray-400 text-lg">
                {Math.round(phaseValue * 100)}% through cycle
              </p>
            </div>
          </>
        ) : null}
        <Button
          onClick={onToggleForecast}
          className="bg-white text-black hover:bg-gray-200 transition-colors px-8 py-3 text-lg font-light"
          size="lg"
        >
          {showForecast ? "Hide" : "Show"} Next 7 Days
          {showForecast ? (
            <ChevronLeft className="ml-2 h-5 w-5" />
          ) : (
            <ChevronRight className="ml-2 h-5 w-5" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
