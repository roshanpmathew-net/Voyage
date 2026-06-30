/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { getAllCountries, type Country } from "@/services/CountryDet";
import CountryCard from "@/ui-components/ExplorePage/Country_Card";
import data from "../data/Countries.json";
import { toast } from "sonner";

import { Funnel, Grid2x2, List, X } from "lucide-react";
import CountryList from "@/ui-components/ExplorePage/Country_List";
import Loader from "@/ui-components/Common/Loader";
import FilterBox from "@/ui-components/ExplorePage/FilterBox";
import CustomButton from "@/ui-components/Common/customButton";

export type Filters = {
  region: string;
  selectedLangs: string[];
  population: number[];
  sortBy: string;
};

const Explore = () => {
  const [countries, setCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    region: "",
    selectedLangs: [],
    population: [1000],
    sortBy: "",
  });

  const [view, setView] = useState<"grid" | "list">("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);

  const handleFilterChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      region: "",
      selectedLangs: [],
      population: [1000],
      sortBy: "",
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.region,
    filters.selectedLangs,
    filters.population,
    filters.sortBy,
  ]);

  const CardsPerpage = 12;

  const lastInd = currentPage * CardsPerpage;
  const firstInd = lastInd - CardsPerpage;

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const selRegion = !filters.region || country.continent === filters.region;

      const selPopulation = country.population >= filters.population[0];

      const selLangs =
        filters.selectedLangs.length === 0 ||
        filters.selectedLangs.some((lang) => {
          return country.languages?.includes(lang);
        });

      return selRegion && selPopulation && selLangs;
    });
  }, [countries, filters.region, filters.selectedLangs, filters.population]);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    switch (filters.sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "population-asc":
        return a.population - b.population;

      case "population-desc":
        return b.population - a.population;

      default:
        return 0;
    }
  });

  const currentCountries = sortedCountries.slice(firstInd, lastInd);
  const totalPages = Math.ceil(sortedCountries.length / CardsPerpage);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // throw console.error()
        const data = await getAllCountries();
        const MainCountries = data.filter((country) => country.code?.trim());

        setLength(MainCountries.length);
        setCountry(MainCountries);
        setLoading(false);
      } catch (e) {
        console.error(e);
        console.log("Falling to backup..");
        toast.warning("Loading Backup...");

        setCountry(data);
        setLength(data.length);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-14 px-4 sm:px-11 relative">
      
      <div className="md:hidden flex justify-start items-center">
        <button 
          onClick={() => setFilterOpen(true)}
          className="bg-white dark:bg-slate-900 h-fit p-3 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center gap-2 font-medium shadow-sm active:scale-95 transition-transform"
        >
          <Funnel size={18} className="text-black dark:text-white" />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setFilterOpen(false)}
          />
          
          <div className="relative w-80 max-w-full bg-white dark:bg-slate-950 h-full p-6 shadow-xl flex flex-col overflow-y-auto transition-transform duration-300">
            <div className="flex items-center justify-between mb-4 border-b pb-4 dark:border-slate-800">
              <h2 className="text-lg font-bold">Filters</h2>
              <button 
                onClick={() => setFilterOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <FilterBox
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClear}
            />
          </div>
        </div>
      )}

      <div className="hidden md:block w-64 shrink-0 bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 sticky top-20 h-fit">
        <FilterBox
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />
      </div>

      {loading ? (
        <div className="flex w-full items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl sm:text-2xl font-bold">Explore {sortedCountries.length <= 0 ? ("") : sortedCountries.length } Countries</p>
            <div className="flex flex-row gap-3 text-center">
              <CustomButton
                active={view === "grid"}
                onClick={() => setView("grid")}
              >
                <Grid2x2 size={18} />
              </CustomButton>

              <CustomButton
                active={view === "list"}
                onClick={() => setView("list")}
              >
                <List size={18} />
              </CustomButton>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {currentCountries.length > 0 ? (
                currentCountries.map((country) => (
                  <CountryCard key={country.name} item={country} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-16">
                  No Results Found
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              {currentCountries.length > 0 ? (
                <>
                  <div className="hidden lg:grid grid-cols-[100px_2fr_120px_120px_220px_40px] gap-6 px-5 py-3 text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-wider">
                    <div>Flag</div>
                    <div>Country</div>
                    <div>Capital</div>
                    <div>Population</div>
                    <div>Language</div>
                    <div className="text-center">Fav</div>
                  </div>

                  {currentCountries.map((country) => (
                    <CountryList
                      key={country.code || country.name}
                      item={country}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400 py-16 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                  <p className="text-lg font-medium">No Results Found</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                    Try adjusting your filters or search keywords.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-8 mb-10">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-2xl bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>

            <span className="font-medium text-sm sm:text-base">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border rounded-2xl bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;