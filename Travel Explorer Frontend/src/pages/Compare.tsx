import { useEffect, useState } from "react";
import { CustomSelect } from "@/ui-components/Compare/CustomSelect";
import compareData from "@/data/Compare.json";
import StatsComponent from "@/ui-components/Compare/StatsComponent";
import { Circle } from "lucide-react";
import StatsTable from "@/ui-components/Compare/StatsTable";

export interface Attraction {
  name: string;
  image: string;
}

export interface CountryDetails {
  country: string;
  tagline: string;
  costOfLivingPerDayUSD: number;
  budgetLevel: "Low" | "Moderate" | "High";
  infrastructureRating: number;
  safetyScore: number;
  climate: string;
  topIndustry: string;
  tourismSpeciality: string[];
  languages: string[];
  visaDifficulty: "Easy" | "Moderate" | "Difficult";
  bestTimeToVisit: string;
  transportOptions: string[];
  touristFriendliness: number;
  attraction: Attraction;
}

const Compare = () => {
  const [selectedA, setSelectedA] = useState("");
  const [selectedB, setSelectedB] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedA && selectedB) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200); 
      
      return () => clearTimeout(timer);
    }
  }, [selectedA, selectedB]);

  const countryA: CountryDetails | null = selectedA
    ? (compareData[selectedA as keyof typeof compareData] as CountryDetails)
    : null;

  const countryB: CountryDetails | null = selectedB
    ? (compareData[selectedB as keyof typeof compareData] as CountryDetails)
    : null;

  return (
    <>
      <section className="relative">
        <div className="relative h-64 sm:h-64 md:h-72 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/Compare.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 via-blue-500/10 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-950/90" />

          <div className="hidden sm:flex relative z-10  h-full flex-col items-center justify-center px-4 text-center pt-4 sm:pt-0">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Compare Countries
            </h1>

            <p className="mt-3 max-w-2xl rounded-full px-5 py-2 text-xs sm:text-sm md:text-base text-slate-800 dark:text-slate-200 backdrop-blur-sm">
              Make data-driven decisions for your next journey by evaluating
              destinations side-by-side.
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 -bottom-24 sm:-bottom-14 z-20 w-full max-w-7xl -translate-x-1/2 px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-md transition-shadow hover:shadow-lg">
              <label
                htmlFor="destination-a"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Destination A
              </label>

              <CustomSelect
                destinationValue={selectedA}
                otherSelected={selectedB || ""}
                setDestinationValue={setSelectedA}
                destination="Destination A"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-md transition-shadow hover:shadow-lg">
              <label
                htmlFor="destination-b"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Destination B
              </label>

              <CustomSelect
                otherSelected={selectedA || ""}
                destinationValue={selectedB}
                setDestinationValue={setSelectedB}
                destination="Destination B"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-32 sm:h-24 md:h-20" />

      {isLoading ? (
        <SkeletonLayout />
      ) : selectedA && selectedB ? (
        <div className="flex flex-col animate-in fade-in duration-500">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 px-4 sm:px-6 lg:px-8 py-6 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-6 w-full lg:w-[320px] shrink-0">
              <ImgCard country={countryA} />
              <ImgCard country={countryB} />
            </div>

            <div className="flex-1 rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 w-full overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-1xl sm:text-2xl font-sans tracking-wide text-slate-900 dark:text-white">
                  Key Logistics Comparison
                </h2>

                <div className="flex items-center gap-4 sm:gap-6 text-sm text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <Circle size={12} className="fill-blue-600 text-blue-600 dark:fill-blue-500 dark:text-blue-500" />
                    <span className="font-medium">{countryA?.country}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Circle
                      size={12}
                      className="fill-green-600 text-green-600 dark:fill-green-500 dark:text-green-500"
                    />
                    <span className="font-medium">{countryB?.country}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <StatsComponent
                  CountryProps={countryA!}
                  bgcolor="bg-blue-600 dark:bg-blue-500"
                  text_color="text-blue-600 dark:text-blue-500"
                />
                <StatsComponent
                  CountryProps={countryB!}
                  bgcolor="bg-green-600 dark:bg-green-500"
                  text_color="text-green-600 dark:text-green-500"
                />
              </div>
            </div>
          </div>
          <StatsTable countryA={countryA!} countryB={countryB!} />
        </div>
      ) : selectedA || selectedB ? (
        <div className="text-center text-xl py-10 px-4 text-slate-600 dark:text-slate-400">
          Please select one more destination to compare.
        </div>
      ) : (
        <div className="text-center text-xl py-10 px-4 text-slate-600 dark:text-slate-400">
          Please select your destinations to begin.
        </div>
      )}
    </>
  );
};

export default Compare;

interface ImgCardProps {
  country: CountryDetails | null;
}

function ImgCard({ country }: ImgCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md h-full">
      <div className="relative">
        <img
          src={country?.attraction?.image || "/images/Imgplaceholder1.jpg"}
          alt={country?.country}
          className="h-40 sm:h-48 w-full object-cover cursor-pointer"
          title={country?.attraction?.name}
        />

        <div className="absolute top-4 left-4 rounded-lg bg-white/70 dark:bg-slate-900/60 px-3 py-1 shadow-sm backdrop-blur-md">
          <p className="font-medium text-slate-800 dark:text-slate-100">{country?.country}</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
          {country?.tourismSpeciality?.[0]} & {country?.tourismSpeciality?.[1]}
        </h3>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-auto">
          {country?.tagline}
        </p>
      </div>
    </div>
  );
}

function SkeletonLayout() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6 px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-6 w-full lg:w-[320px] shrink-0">
          <SkeletonImgCard />
          <SkeletonImgCard />
        </div>

        <div className="flex-1 rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 w-full overflow-hidden animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="h-8 w-64 bg-slate-300 dark:bg-slate-700 rounded-md" />
            <div className="flex gap-4">
              <div className="h-4 w-20 bg-slate-300 dark:bg-slate-700 rounded-md" />
              <div className="h-4 w-20 bg-slate-300 dark:bg-slate-700 rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <SkeletonStatsColumn />
            <SkeletonStatsColumn />
          </div>
        </div>
      </div>

      <div className="w-full h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl animate-pulse mt-4 p-6">
        <div className="h-10 w-full bg-slate-300 dark:bg-slate-700 rounded-md mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonImgCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm h-full animate-pulse">
      <div className="h-40 sm:h-48 w-full bg-slate-300 dark:bg-slate-700" />
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-700 rounded" />
        <div className="mt-auto space-y-2">
          <div className="h-3 w-full bg-slate-300 dark:bg-slate-700 rounded" />
          <div className="h-3 w-5/6 bg-slate-300 dark:bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  );
}

function SkeletonStatsColumn() {
  return (
    <div className="space-y-8 sm:space-y-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex gap-2 items-center">
            <div className="h-5 w-5 bg-slate-300 dark:bg-slate-700 rounded-full" />
            <div className="h-5 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
          </div>
          <div className="h-2 w-full bg-slate-300 dark:bg-slate-700 rounded-full" />
          <div className="h-4 w-16 bg-slate-300 dark:bg-slate-700 rounded" />
        </div>
      ))}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
        <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
        <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
      </div>
    </div>
  );
}