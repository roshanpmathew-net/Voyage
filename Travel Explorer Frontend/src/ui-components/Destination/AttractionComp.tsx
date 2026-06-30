import { useEffect, useState } from "react";
import type { Destination } from "../Globe/GlobeDiv";
import { getImages } from "@/services/Image";

interface AttractionCompProps {
  destination: Destination;
}



const AttractionComp = ({ destination }: AttractionCompProps) => {
  return (
    <div className="flex flex-col gap-6 ">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
          Major Attractions
        </h2>
        <div className="flex flex-col gap-3">
          {destination.topAttractions?.map((attraction, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0">
                <img
                  src={attraction.attractionimage}
                  alt={attraction.name}
                  className="w-full h-full object-cover scale-110 filter saturate-85"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  {attraction.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  Duration: {attraction.duration}
                </p>
                <div className="flex items-center gap-1 mt-1 text-amber-500">
                  {"★".repeat(5)}
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium ml-1">
                    (4.9)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Location Map</h3>
          <a
            href={`https://www.google.com/maps?q=${destination.lat},${destination.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <div className="h-44 w-full bg-slate-100 dark:bg-slate-950 rounded-xl relative overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-colors duration-300">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-size-[16px_16px] dark:opacity-20 dark:bg-[radial-gradient(#94a3b8_1px,transparent_1px)]" />
          <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div className="bg-blue-600 p-2 rounded-full text-white shadow-md shadow-blue-600/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-800 dark:text-slate-100 px-2 py-0.5 rounded-md whitespace-nowrap transition-colors duration-300">
              {destination.name} Peak
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
          Located precisely at coordinates{" "}
          <strong className="text-slate-700 dark:text-slate-300">
            {destination.lat.toFixed(4)}° N, {destination.lng.toFixed(4)}° E
          </strong>{" "}
          within the beautiful region of {destination.region}.
        </p>
      </div>
    </div>
  );
};

export default AttractionComp;
