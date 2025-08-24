import { Moon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRefresh: () => void;
}

export function Header({ onRefresh }: HeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Moon className="h-10 w-10 text-white" />
        <h1 className="text-5xl font-light tracking-wide text-white">Moon Phase Tracker </h1>
      </div>
      <p className="text-gray-400 text-xl font-light">
        Track the current moon phase and its progress
      </p>
      <Button
        onClick={onRefresh}
        variant="outline"
        className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-900/50 hover:text-white transition-colors"
        size="sm"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
}
