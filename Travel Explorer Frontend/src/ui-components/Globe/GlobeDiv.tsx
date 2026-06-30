import { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import data from "@/data/Destinations.json";

export type Destination = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  didYouKnow: string;

  highlights: string[];
  topAttractions: {
    name: string;
    entryFee: string;
    duration: string;
    rating: string;
    attractionimage: string
  }[];

  bestTimeToVisit: string;
  budgetLevel: "Budget" | "Mid-range" | "Luxury";
  currency: string;
  language: string[];
  averageTemperature: string;
  visaDifficulty: "Easy" | "Moderate" | "Difficult";
  famousFor: string[];
  image?: string;

  color: string;
};

const destinations = data as Destination[];

interface GlobeProps {
  isDark: boolean;
  selected: Destination | null;
  setSelected: React.Dispatch<React.SetStateAction<Destination | null>>;
  globeRef: React.MutableRefObject<any>;
}

const GlobeDiv = ({ isDark, setSelected, selected, globeRef }: GlobeProps) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();

    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
  }, [globeRef]);

  const handleClick = (point: object) => {
    const destination = point as Destination;
    setSelected(destination);

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: destination.lat, lng: destination.lng, altitude: 1.2 },
        1500,
      );
    }
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handlePointHover = (point: object | null) => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();

    if (point) {
      controls.autoRotate = false;
    } else if (!selected) {
      controls.autoRotate = true;
    }
  };

  return (
    <div className="relative cursor-grab active:cursor-grabbing w-full h-full bg-slate-50 dark:bg-transparent transition-colors duration-1000">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 pointer-events-none ${
          isDark
            ? "opacity-0"
            : "bg-[url('/images/skybg.jpg')] " 
        }`}
      />
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={
          isDark
            ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
            : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        }
        showAtmosphere={true}
        atmosphereColor={isDark ? "#3b82f6" : "#60a5fa"}
        atmosphereAltitude={0.15}
        ringsData={destinations}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: any) => d.color || (isDark ? "#ffffff" : "#1e293b")}
        ringMaxRadius={3}
        ringPropagationSpeed={1.5}
        ringRepeatPeriod={800}
        htmlElementsData={destinations}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.05}
        htmlElement={(d: any) => {
          const el = document.createElement("div");

          const defaultDotColor = isDark ? "#ffffff" : "#1e293b";
          const dotColor = d.color || defaultDotColor;
          const textColor = "#ffffff";
          const dotShadow = isDark
            ? `0 0 10px ${dotColor}`
            : `0 2px 4px rgba(0, 0, 0, 0.4)`;
          const textOutline = "0px 1px 3px rgba(0,0,0,0.8)"

          Object.assign(el.style, {
            color: textColor,
            width: "100px",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            pointerEvents: "auto",
            userSelect: "none",
            transform: "translate(-50%, -50%)",
            textShadow: textOutline,
          });

          el.innerHTML = `
            <div style="
              width: 10px; 
              height: 10px; 
              background-color: ${dotColor}; 
              border-radius: 50%; 
              margin: 0 auto 4px auto;
              box-shadow: ${dotShadow};
            "></div>
            <div>${d.name}</div>
          `;

          el.onclick = (e) => {
            e.stopPropagation();
            handleClick(d);
          };
          el.onmouseenter = () => handlePointHover(d);
          el.onmouseleave = () => handlePointHover(null);

          return el;
        }}
      />
    </div>
  );
};

export default GlobeDiv;
