import { useRef, useState, useEffect } from "react";
import { MapPin, X, Navigation2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GlobeDiv from "@/ui-components/Globe/GlobeDiv";
import TopleftComp from "@/ui-components/Globe/TopleftComp";
import ToprightComp from "@/ui-components/Globe/ToprightComp";
import DidyouKnow from "@/ui-components/Globe/DidyouKnow";
import type { Destination } from "@/ui-components/Globe/GlobeDiv";

import data from "@/data/Destinations.json";

const destinations = data as Destination[];

export default function GlobePage() {
  const nav = useNavigate();
  const globeRef = useRef<any>(null);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const clearSelection = () => {
    setSelected(null);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.pointOfView({ altitude: 2.5 }, 1500);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const destination = destinations[randomIndex];
    setSelected(destination);

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: destination.lat, lng: destination.lng, altitude: 1.2 },
        1500,
      );
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      <GlobeDiv
        isDark={isDark}
        selected={selected}
        setSelected={setSelected}
        globeRef={globeRef}
      />

      <div
        className={`absolute bottom-8 left-1/2 md:left-8 z-10 w-[90%] md:w-80 -translate-x-1/2 md:translate-x-0 transition-all duration-500 ease-out transform ${
          selected
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        {selected && (
          <div className="relative rounded-2xl p-6 backdrop-blur-xl shadow-2xl bg-slate-950/80 dark:bg-blue-50/90 border border-slate-800 dark:border-blue-200/60 pointer-events-auto">
            <button
              onClick={clearSelection}
              className="absolute top-4 right-4 transition-colors cursor-pointer text-slate-400 hover:text-white dark:text-blue-400 dark:hover:text-blue-800"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800/60 dark:bg-blue-200/50 text-blue-400 dark:text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight text-white dark:text-slate-900">
                  {selected.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200 dark:text-blue-800">
                  {selected.region}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 dark:text-blue-900/80">
              {selected.description}
            </p>

            <button
              onClick={() => nav(`/destination/${selected.name}`)}
              className="mt-6 flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] bg-blue-600 dark:bg-blue-600 text-white"
            >
              <Navigation2 size={16} />
              Explore Destination
            </button>
          </div>
        )}
      </div>

      <div
        className={`absolute bottom-8 right-4 md:right-8 z-10 w-[90%] md:w-80 max-w-sm transition-all duration-500 ease-out transform pointer-events-none hidden md:block ${
          selected ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {selected && <DidyouKnow selected={selected} />}
      </div>

      <TopleftComp />

      <ToprightComp handleRandomize={handleRandomize} />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full bg-white/20 dark:bg-slate-900/70 px-6 py-2 backdrop-blur-md shadow-sm pointer-events-none hidden md:block">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Rotate to explore • Click points to zoom
        </p>
      </div>
    </div>
  );
}
