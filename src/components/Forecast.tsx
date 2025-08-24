import { getMoonPhaseEmoji } from "@/lib/api";
import type { MoonPhaseInfo } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

type ForecastProps = {
  forecast: MoonPhaseInfo[];
  formatDate: (date: Date) => string;
};

export function Forecast({ forecast, formatDate }: ForecastProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-light text-center text-white tracking-wide">
        7-Day Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {forecast.map((day, index) => {
          const dateObj = new Date(day.date);
          const safeName = day.name || "";
          const emoji = getMoonPhaseEmoji(safeName);
          return (
            <Card
              key={index}
              className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-sm font-light text-gray-400 uppercase tracking-wider">
                  {formatDate(dateObj)}
                </div>
                <div className="text-5xl">{emoji}</div>
                <div className="space-y-2">
                  <div className="font-light text-white text-base tracking-wide">
                    {safeName || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {typeof day.value === "number"
                      ? `${Math.round(day.value * 100)}% cycle`
                      : "No data"}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
