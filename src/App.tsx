import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Today } from "@/components/Today";
import { Forecast } from "@/components/Forecast";
import { About } from "@/components/About";
import { formatDate } from "@/lib/utils";
import { fetchMoonPhases, extractMoonPhasesOnly } from "@/lib/api";
import type { MoonPhaseInfo } from "@/lib/types";

function App() {
  const [showForecast, setShowForecast] = useState(false);
  const [forecast, setForecast] = useState<MoonPhaseInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const lat = 58.7984;
  const lng = 17.8081;
  const apiKey = import.meta.env.VITE_API_KEY || "";

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    async function loadForecast() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoonPhases(lat, lng, apiKey);
        const phases = extractMoonPhasesOnly(data);
        setForecast(
          phases.slice(1, 8).map((p) => ({
            date: p.date,
            name: p.name || "",
            value: typeof p.value === "number" ? p.value : 0,
          }))
        );
      } catch {
        setError("Failed to load forecast");
      } finally {
        setLoading(false);
      }
    }
    loadForecast();
  }, [lat, lng, apiKey, refreshKey]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <Header onRefresh={handleRefresh} />
        <About />
        <Today
          lat={lat}
          lng={lng}
          apiKey={apiKey}
          showForecast={showForecast}
          onToggleForecast={() => setShowForecast((v) => !v)}
          formatDate={formatDate}
        />

        {showForecast &&
          (loading ? (
            <div className="text-gray-400 text-center">Loading forecast...</div>
          ) : error ? (
            <div className="text-red-400 text-center">{error}</div>
          ) : (
            <Forecast forecast={forecast} formatDate={formatDate} />
          ))}
        <About />
      </div>
    </div>
  );
}

export default App;
