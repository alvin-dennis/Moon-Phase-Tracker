import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <Card className="bg-gray-900/20 border-gray-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white font-light text-xl tracking-wide">
          About Lunar Cycles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-400">
        <p className="text-base font-light leading-relaxed">
          The lunar cycle takes approximately 29.5 days to complete, during
          which the moon transitions through eight distinct phases.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="text-center space-y-2">
            <div className="text-3xl">🌑</div>
            <div className="text-xs font-light text-gray-500 uppercase tracking-wider">
              New Moon
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl">🌓</div>
            <div className="text-xs font-light text-gray-500 uppercase tracking-wider">
              First Quarter
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl">🌕</div>
            <div className="text-xs font-light text-gray-500 uppercase tracking-wider">
              Full Moon
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl">🌗</div>
            <div className="text-xs font-light text-gray-500 uppercase tracking-wider">
              Last Quarter
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
