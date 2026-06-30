import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCountryDetails,
  type CountryDetails,
  mapRawToCountryDetails,
  type RawCountryDetails,
} from "@/services/CountryDet";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { toggleFavorite } from "@/redux/favoritesSlice";
import { getImage, type CountryImage } from "@/services/Image";
import CountryData from "../data/CountryDetails.json";
import Loader from "@/ui-components/Common/Loader";
import { Button } from "@base-ui/react/button";
import { CircleArrowRight, Heart, Map } from "lucide-react";
import CountryDet from "@/ui-components/ExplorePage/Country_Det";
import ImageGallery from "@/ui-components/CountryPage/Image_Gallery";
import { toast } from "sonner";

import GalleryFull from "@/ui-components/CountryPage/GalleryFull";

import { recordActivity } from "@/redux/recentActivitySlice";

const Country = () => {
  const { code } = useParams();
  const [countryData, setCountryData] = useState<CountryDetails | null>(null);
  const [countryImage, setImage] = useState<CountryImage | null>(null);
  const [loading, setLoading] = useState(true);

  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const countryId =
    countryData?.code && countryData.code !== "N/A"
      ? countryData.code
      : countryData?.name || "";
  const isLiked = favorites.includes(countryId);

  useEffect(() => {
    const fetchData = async () => {
      if (!code) return;

      setLoading(true);

      try {
        throw console.error();

        const data = await getCountryDetails(code);

        setCountryData(data);
        dispatch(
          recordActivity({
            id: Date.now(),
            activity: `Viewed ${data.name}`,
            time: new Date().toISOString(),
          }),
        );

        try {
          const image = await getImage(data.name);
          setImage(image);
        } catch (imageError) {
          console.error("Error fetching country image:", imageError);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);

        toast.warning("Loading Backup...");
        const rawBackup = (CountryData as Record<string, RawCountryDetails>)[
          code.toUpperCase()
        ];

        if (rawBackup) {
          const backupCountryData = mapRawToCountryDetails(rawBackup);

          setCountryData(backupCountryData);
          dispatch(
            recordActivity({
              id: Date.now(),
              activity: `Viewed ${backupCountryData.name}`,
              time: new Date().toISOString(),
            }),
          );

          try {
            const image = await getImage(backupCountryData.name);

            setImage(image);
          } catch (imageError) {
            console.error("Error fetching backup image:", imageError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLike = () => {
    // if (!countryData) return;

    

    if (isLiked) {
      toast.success("Removed from favorites");

      dispatch(
        recordActivity({
          id: Date.now(),
          activity: `Removed ${countryData!.name} from Favorites`,
          time: new Date().toISOString(),
        }),
      );
    } else {
      toast.success("Added to favorites");

      dispatch(
        recordActivity({
          id: Date.now(),
          activity: `Added ${countryData!.name} to Favorites`,
          time: new Date().toISOString()
        }),
      );
    }
    dispatch(toggleFavorite(countryId))
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="relative w-full group h-[75vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000 ease-out group-hover:scale-120"
          style={{ backgroundImage: `url(${countryImage?.src})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-end">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 px-4 sm:px-8 lg:px-20 pb-8 lg:pb-12 text-white">
            <div>
              <div className="flex items-center gap-3 sm:gap-5 mb-4">
                <img
                  src={countryData?.flag}
                  alt={countryData?.flagAlt}
                  className="w-14 h-10 sm:w-18 sm:h-12"
                />

                <p className="bg-blue-600 text-white px-3 py-1 rounded-4xl text-sm sm:text-base">
                  {countryData?.continent}
                </p>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
                {countryData?.name}
              </h1>

              <p className="max-w-2xl mt-4 text-sm sm:text-base lg:text-lg text-white/90">
                {countryImage?.alt}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                className="bg-blue-600 flex items-center justify-center p-4 px-6 lg:px-8 rounded-lg gap-3 cursor-pointer w-full sm:w-auto"
                onClick={handleLike}
              >
                <Heart
                  className={isLiked ? "fill-white text-white" : "text-white"}
                  size={24}
                />
                {isLiked ? "Remove from Favorites" : "Add to Favorites"}
              </Button>

              <a
                href={countryData?.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="bg-white dark:bg-slate-900 text-black dark:text-white border border-transparent dark:border-slate-800 flex items-center justify-center p-4 px-4 rounded-lg gap-3 cursor-pointer w-full sm:w-auto">
                  <Map className="text-black dark:text-white" />
                  View on Google Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CountryDet item={countryData!} />
      </div>
      <div className="mx-4 sm:mx-8 lg:mx-10 mt-8 ">
        <div className="group relative overflow-hidden bg-[#2563EB] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-white z-10">
            <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
              Travel Guide
            </p>

            <h2 className="text-2xl md:text-4xl font-bold mt-2">
              Navigate {countryData?.name.toUpperCase()}
            </h2>

            <p className="mt-3 text-blue-100 leading-relaxed">
              Plan your travel route through the island peaks and metropolitan
              wonders.
            </p>

            <a
              href={countryData?.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-6 px-5 py-3 bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 border border-transparent dark:border-slate-800 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              Open Street Map
            </a>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 md:translate-x-4 md:translate-y-4">
            <Map
              size={260}
              strokeWidth={1.5}
              className="text-white opacity-10 transition-transform duration-500 group-hover:scale-120"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 w-full bg-blue-100/80 dark:bg-slate-900/50 p-6 sm:p-8 lg:p-11 rounded-3xl border border-transparent dark:border-slate-850">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Visual Exploration
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-gray-600 dark:text-slate-400">
                Curated moments from across the archipelago.
              </p>

              <button
                onClick={() => setOpen(true)}
                className="
                  flex items-center gap-2
                  text-blue-600 dark:text-blue-400 font-medium
                  cursor-pointer
                  transition-all duration-300
                  hover:gap-3
                "
              >
                View All
                <CircleArrowRight size={20} />
              </button>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-50 ${
              isOpen ? "flex" : "hidden"
            } items-center justify-center p-4`}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onDoubleClick={() => setOpen(false)}
            />

            <GalleryFull name={countryData?.name} setOpen={setOpen} />
          </div>

          <ImageGallery name={countryData?.name} />
        </div>
      </div>
    </div>
  );
};

export default Country;
