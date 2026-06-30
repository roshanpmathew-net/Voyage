import { useEffect, useState } from "react";
import CountryCard from "@/ui-components/ExplorePage/Country_Card";
import {
  getCountryDetails,
  type Country,
  type RawCountryDetails,
} from "@/services/CountryDet";
import CountryData from "../data/CountryDetails.json";

import { Grid2x2, List } from "lucide-react";
import CountryList from "@/ui-components/ExplorePage/Country_List";
import { toast } from "sonner";
import Loader from "@/ui-components/Common/Loader";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import CustomButton from "@/ui-components/Common/customButton";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const favCodes = useSelector((state: RootState) => state.favorites.favorites);

  if (user) {
    useEffect(() => {
      const fetchFavs = async () => {
        if (!favCodes || favCodes.length === 0) {
          setCountries([]);
          setLoading(false);
          return;
        }
        setLoading(true);
        try {
          throw console.error();

          const data = await Promise.all(
            favCodes.map((code) => getCountryDetails(code)),
          );
          setCountries(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching favorites details:", error);
          toast.warning("Loading Backup...");
          const backup = favCodes
            .map((code) => {
              const item = (CountryData as Record<string, RawCountryDetails>)[
                code.toUpperCase()
              ];
              if (!item) return null;
              return {
                name: item.names?.common ?? "N/A",
                capital: item.capitals?.[0]?.name ?? "N/A",
                population: item.population ?? 0,
                continent: item.continents?.[0] ?? "N/A",
                code: item.codes?.alpha_3 ?? "N/A",
                languages:
                  item.languages?.map((lang) => lang.name).join(", ") ?? "N/A",
                flag: item.flag?.url_png || item.flag?.url_svg || "",
              };
            })
            .filter((country): country is Country => country !== null);
          setCountries(backup);
          setLoading(false);
        }
      };

      fetchFavs();
    }, [favCodes]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Favorites
          </h1>

          {!loading && (
            <p className={`${user ? "text-gray-500 mt-1" : "hidden"}`}>
              {countries.length} saved destinations
            </p>
          )}
        </div>

        <div
          className={`${user ? "flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl" : "hidden"}`}
        >
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

      {user ? (
        loading ? (
          <Loader />
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {countries.length > 0 ? (
              countries.map((country) => (
                <CountryCard key={country.name} item={country} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No favorites found
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
            {countries.length > 0 ? (
              <>
                <div className="hidden lg:grid grid-cols-[100px_2fr_120px_120px_220px_40px] gap-6 px-5 py-3 text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <div>Flag</div>
                  <div>Country</div>
                  <div>Capital</div>
                  <div>Population</div>
                  <div>Language</div>
                  <div className="text-center">Fav</div>
                </div>

                {countries.map((country) => (
                  <CountryList key={country.name} item={country} />
                ))}
              </>
            ) : (
              <p className="text-center text-gray-500 py-10">
                No favorites found
              </p>
            )}
          </div>
        )
      ) : (
        <div className="flex items-center flex-col gap-4 justify-center py-20">
          <p className="text-lg text-gray-500">
            Please Login to Access this feature
          </p>
          <Link to="/login">
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer px-6">
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
