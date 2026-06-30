import { useParams } from "react-router-dom";
import data from "@/data/Destinations.json";
import { useEffect, useState } from "react";
import type { Destination } from "@/ui-components/Globe/GlobeDiv";
import { getImage } from "@/services/Image";
import Loader from "@/ui-components/Common/Loader";
import DestinationGallery from "@/ui-components/Destination/DestinationGallery";
import AttractionComp from "@/ui-components/Destination/AttractionComp";

const DestinationPage = () => {
  const { name } = useParams<{ name: string }>();

  const [destination, setDestination] = useState<Destination | undefined>();
  const [image, setImage] = useState("");
  const [imagealt, setImageAlt] = useState("")
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!name) return;

    const foundDestination = data.find(
      (dest) =>
        dest.id === name.toLowerCase() ||
        dest.name.toLowerCase() === name.toLowerCase(),
    );

    setDestination(foundDestination as Destination);

    const fetchImage = async () => {
      try {
        setLoading(true);
        const searchName = foundDestination ? foundDestination.name : name;
        const res = await getImage(searchName);

        setImage(res.src);
        setImageAlt(res.alt)
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch image:", e);
        setLoading(false);
      }
    };

    fetchImage();
  }, [name]);

  if (!destination) {
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h3 className="text-xl font-medium text-gray-600 dark:text-slate-400">
          Destination "{name}" not found.
        </h3>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  const standardAttraction = destination.topAttractions?.[0];

  const infoCards = [
    {
      label: "Best Time",
      value: destination.bestTimeToVisit,
      subText: "Optimal conditions",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      textClass: "text-blue-600 dark:text-blue-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 3V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Entry Fee",
      value: standardAttraction?.entryFee || "Free Access",
      subText: "Approx. standard attraction",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
      textClass: "text-indigo-600 dark:text-indigo-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Duration",
      value: standardAttraction?.duration || "Flexible",
      subText: "Average time spent",
      bgClass: "bg-violet-50 dark:bg-violet-950/40",
      textClass: "text-violet-600 dark:text-violet-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Weather",
      value: destination.averageTemperature,
      subText: "Seasonal Average",
      bgClass: "bg-amber-50 dark:bg-amber-950/40",
      textClass: "text-amber-600 dark:text-amber-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707-.707m12.728 5.657a5 5 0 11-10 0 5 5 0 0110 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16 font-sans antialiased text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      <div className="relative h-105 w-full overflow-hidden shadow-lg group">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000 ease-out group-hover:scale-120"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-6 pb-10 flex flex-col items-start gap-4 z-10">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white tracking-wide border border-white/10">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {destination.region}
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-sm">
              {destination.name}
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-200 max-w-2xl font-light leading-relaxed">
              {imagealt}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isFavorite
                  ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20"
              }`}
            >
              <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </button>
            <a
              href={`https://www.google.com/maps?q=${destination.lat},${destination.lng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-md hover:bg-slate-800/80 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 ">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-8 relative z-10">
          {infoCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-start gap-4 transition-colors duration-300">
              <div className={`p-3 rounded-xl ${card.bgClass} ${card.textClass}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  {card.label}
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">
                  {card.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {card.subText}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          
         
          <DestinationGallery destination={destination}/>

          
          <AttractionComp destination={destination}/>

        </div>
      </div>

    </div>
  );
};

export default DestinationPage;