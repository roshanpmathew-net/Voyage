import { Heart } from "lucide-react";
import { type Country } from "@/services/CountryDet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { toggleFavorite } from "@/redux/favoritesSlice";
import { recordActivity } from "@/redux/recentActivitySlice";
import { toast } from "sonner";

interface CountryCardProps {
  item: Country;
}

const CountryList = ({ item }: CountryCardProps) => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const countryId = item.code && item.code !== "N/A" ? item.code : item.name;
  
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isLiked = favorites.includes(countryId);

  const formatPopulation = (population: number) => {
    if (population >= 1_000_000_000) return `${(population / 1_000_000_000).toFixed(1)}B`;
    if (population >= 1_000_000) return `${(population / 1_000_000).toFixed(1)}M`;
    if (population >= 1_000) return `${(population / 1_000).toFixed(0)}K`;
    return population.toString();
  };

  const handleCardClick = () => {
    nav(`/country/${encodeURIComponent(countryId)}`);
  };
   const handleLike = () => {
        console.log("Clicked: ",item.name)
        if (isLiked) {
          toast.success("Removed from favorites");
          dispatch(
            recordActivity({
              id: Date.now(),
              activity: `Removed ${item.name} from Favorites`,
              time: new Date().toISOString(),
            }),
          );
        } else {
          toast.success("Added to favorites");
    
          dispatch(
            recordActivity({
              id: Date.now(),
              activity: `Added ${item.name} to Favorites`,
              time: new Date().toISOString(),
            }),
          );
        }
        dispatch(toggleFavorite(countryId))
      };
  
 
  return (
    <div
      onClick={handleCardClick}
      className="relative flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-5 cursor-pointer hover:shadow-md lg:grid lg:grid-cols-[100px_2fr_120px_120px_220px_40px] transition-all duration-200"
    >
      <div className="flex items-center justify-between sm:block">
        <img
          src={item.flag}
          alt={`${item.name} flag`}
          className="w-20 h-13 sm:w-22.5 sm:h-15 object-cover rounded-xl shadow-xs"
        />
        
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            handleLike()
          }}
          className="lg:hidden p-2 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 transition-transform active:scale-90 ${
              isLiked ? "fill-red-500 text-red-500" : "text-slate-400 dark:text-slate-500"
            }`}
          />
        </button>
      </div>

      <div className="min-w-0">
        <h2 className="font-bold text-xl sm:text-2xl lg:text-lg text-slate-800 dark:text-slate-100 truncate">
          {item.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-medium">
          {item.continent}
        </p>
      </div>

      <div className="border-t border-dashed border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:border-0 min-w-0">
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider lg:hidden">Capital</p>
        <p className="text-base sm:text-lg lg:text-base font-semibold text-slate-700 dark:text-slate-200 truncate">
          {item.capital || "—"}
        </p>
      </div>
      <div className="pt-4 lg:pt-0 min-w-0">
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider lg:hidden">Population</p>
        <p className="text-base sm:text-lg lg:text-base font-semibold text-slate-700 dark:text-slate-200">
          {formatPopulation(item.population)}
        </p>
      </div>

      <div className="pt-4 lg:pt-0 min-w-0">
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wider lg:hidden">Language</p>
        <p
          className="text-base sm:text-lg lg:text-base font-semibold truncate text-slate-700 dark:text-slate-200"
          title={item.languages}
        >
          {item.languages || "—"}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); 
          dispatch(toggleFavorite(countryId));
        }}
        className="hidden lg:flex justify-center items-center cursor-pointer hover:scale-110 transition-transform p-1"
      >
        <Heart
          className={`w-6 h-6 transition-colors ${
            isLiked ? "fill-red-500 text-red-500" : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
          }`}
        />
      </button>
    </div>
  );
};

export default CountryList;