import { Banknote, Building2, ImageIcon, Users } from "lucide-react";
import data from "../../data/Featured.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Country {
  id: number;
  name: string;
  code:string;
  population: number;
  capital: string;
  attractionName: string;
  currency: string;
  image: string;
}

const Featured = () => {
  const { t } = useTranslation();
  const [featured] = useState<{ mainCountry: Country; sideCountries: Country[] }>(() => {
    const main = data[Math.floor(Math.random() * data.length)];
    const available = data.filter((c) => c.id !== main.id);
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return {
      mainCountry: main,
      sideCountries: shuffled.slice(0, 2),
    };
  });
  const { mainCountry, sideCountries } = featured;
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mainCountry || !sideCountries) return;

    const imageUrls = [
      mainCountry.image,
      ...sideCountries.map((country) => country.image),
    ];

    let loadedCount = 0;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [mainCountry, sideCountries]);

  return (
    <div className="w-full pt-10">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-50">{t("featured_countries")}</h1>
        <p className="mt-2 max-w-xl mx-auto sm:mx-0 text-gray-600 dark:text-slate-400 leading-relaxed">
          {t("featured_countries_description")}
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4 mt-4">
        {/* Main Card */}
        <div className="w-full lg:w-2/3 h-64 sm:h-80 md:h-100 rounded-xl relative overflow-hidden group cursor-pointer" onClick={() => navigate(`/country/${mainCountry?.code}`)}>
          {!imagesLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse">
              <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${mainCountry?.image})` }}
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent rounded-xl" />

          <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white w-full">
            <h2 className="text-2xl md:text-4xl font-bold">{mainCountry?.name}</h2>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-2 text-xs md:text-sm">
              <p className="flex items-center gap-2">
                <Building2 size={16} />
                {mainCountry?.capital}
              </p>

              <p className="flex items-center gap-2">
                <Users size={16} />
                {((mainCountry?.population ?? 0) / 1000000).toFixed(1)}M
              </p>

              <p className="flex items-center gap-2">
                <Banknote size={16} />
                {mainCountry?.currency.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Side Cards */}
        <div className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-4">
          {sideCountries?.map((country) => (
            <div
              key={country.id}
              className="group relative w-full sm:w-1/2 lg:w-full h-48 rounded-xl overflow-hidden cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/country/${country.code}`);
              }}
            >
              {!imagesLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse">
                  <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${country.image})` }}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />

              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl md:text-2xl font-bold">{country.name}</h3>
                <p className="text-xs md:text-sm opacity-90">
                  Capital: {country.capital} • Pop:{" "}
                  {(country.population / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;