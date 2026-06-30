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

const CountryCard = ({ item }: CountryCardProps) => {
  const nav = useNavigate();
  const countryId = item.code && item.code !== "N/A" ? item.code : item.name;

  

  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isLiked = favorites.includes(countryId);

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
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-slate-800 max-w-sm cursor-pointer">
      <div className="relative">
        <img
          src={item.flag || "./images/flag.png"}
          alt={item.name}
          className="w-full h-44 object-cover"
        />

        <button
          onClick={handleLike}
          className="absolute cursor-pointer top-3 right-3 w-10 h-10 rounded-xl bg-black backdrop-blur-md flex items-center justify-center"
        >
          <Heart
            className={`w-5   h-5 ${isLiked ? "text-red-800 fill-red-800" : "text-white"}`}
          />
        </button>
      </div>

      <div
        className="p-4"
        onClick={() =>
  nav(`/country/${encodeURIComponent(countryId)}`)
}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {item.name}
          </h2>

          <span className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase">
            {item.continent}
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 pt-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Capital
              </p>
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                {item.capital}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Population
              </p>
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                {item.population >= 1_000_000_000
                  ? `${(item.population / 1_000_000_000).toFixed(1)}B`
                  : item.population >= 1_000_000
                    ? `${(item.population / 1_000_000).toFixed(1)}M`
                    : item.population >= 1_000
                      ? `${(item.population / 1_000).toFixed(0)}K`
                      : item.population.toString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
