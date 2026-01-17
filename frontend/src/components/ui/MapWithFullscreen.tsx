import * as React from "react";
import { Button } from "./button";
import { Fullscreen, FullscreenIcon } from "lucide-react";

export function MapWithFullscreen({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-lg overflow-hidden"
    >
      {/* Fullscreen button */}
      <div className="absolute top-2 right-2 z-1">
        <Button size="lg" variant="outline" onClick={toggleFullscreen}>
          {isFullscreen ? <Fullscreen /> : <FullscreenIcon />}
        </Button>
      </div>

      {children}
    </div>
  );
}
