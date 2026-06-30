import { toast } from "sonner";

export interface CountryDetails {
  name: string;
  officialName: string;
  flag: string;
  flagAlt: string;

  capital: string;
  continent: string;

  population: number;
  area: number;

  currency: string;
  languages: string;
  code: string;

  timezone: string[];

  googleMaps: string;
  openStreetMaps: string;
}

export interface Country {
  name: string;
  capital: string;
  population: number;
  continent: string;
  languages: string;
  flag: string;
  code: string;
}

const APIKEY = import.meta.env.VITE_COUNTRY_API_KEY;

interface RawFlag {
  url_png?: string;
  url_svg?: string;
  description?: string;
}

interface RawCurrency {
  name: string;
  symbol: string;
}

interface RawLanguage {
  name: string;
}

export interface RawCountryDetails {
  names?: {
    common?: string;
    official?: string;
  };
  flag?: RawFlag;
  capitals?: { name: string }[];
  codes?: { alpha_3?: string };
  continents?: string[];
  population?: number;
  area?: { kilometers?: number };
  currencies?: RawCurrency[];
  languages?: RawLanguage[];
  timezones?: string[];
  links?: {
    google_maps?: string;
    open_street_maps?: string;
  };
}

export const mapRawToCountryDetails = (country: RawCountryDetails): CountryDetails => {
  return {
    name: country.names?.common ?? "N/A",
    officialName: country.names?.official ?? "N/A",
    flag: country.flag?.url_png || country.flag?.url_svg || "",
    flagAlt: country.flag?.description ?? "",
    capital: country.capitals?.[0]?.name ?? "N/A",
    code: country.codes?.alpha_3 ?? "N/A",
    continent: country.continents?.join(", ") ?? "N/A",
    population: country.population ?? 0,
    area: country.area?.kilometers ?? 0,
    currency:
      country.currencies
        ?.map((c) => `${c.name} (${c.symbol})`)
        .join(", ") ?? "N/A",
    languages:
      country.languages?.map((lang) => lang.name).join(", ") ?? "N/A",
    timezone: country.timezones ?? [],
    googleMaps: country.links?.google_maps ?? "",
    openStreetMaps: country.links?.open_street_maps ?? "",
  };
};

export const getCountryDetails = async (
  code?: string,
): Promise<CountryDetails> => {
  try {
    // console.log(
    //   `https://api.restcountries.com/countries/v5/codes.alpha_3/${code}`,
    // );
    const res = await fetch(
      `https://api.restcountries.com/countries/v5/codes.alpha_3/${code}`,
      { headers: { Authorization: `Bearer ${APIKEY}` } },
    );

    if (!res.ok) {
      // const error = await res.text();

      // const backupRes = await fetch(
      //   `https://api.restcountries.com/countries/v5?q=${name}&limit=1`,
      //   { headers: { Authorization: `Bearer ${APIKEY}` } },
      // );

      const error = await res.text();

      console.log("STATUS:", res.status);
      console.log("ERROR:", error);

      throw new Error(error);
    }
    const data = await res.json();
    const country = data.data.objects[0];

    return mapRawToCountryDetails(country);
  } catch (error) {
    toast.error("Error Getting Details");
    console.error("Error fetching country details:", error);
    throw error;
  }
};

interface RawCountrySummary {
  names?: { common?: string };
  capitals?: { name: string }[];
  population?: number;
  continents?: string[];
  codes: { alpha_3?: string };
  languages?: RawLanguage[];
  flag?: RawFlag;
}

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const fetchPage = async (offset: number) => {
      const res = await fetch(
        `https://api.restcountries.com/countries/v5?response_fields=names.common,capitals,codes.alpha_3,population,continents,languages,flag&limit=100&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${APIKEY}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      return res.json();
    };

    const [page1, page2, page3] = await Promise.all([
      fetchPage(0),
      fetchPage(100),
      fetchPage(200),
    ]);

    const allCountries = [
      ...page1.data.objects,
      ...page2.data.objects,
      ...page3.data.objects,
    ];

    const countryData: Country[] = allCountries.map((item: RawCountrySummary) => ({
      name: item.names?.common ?? "N/A",
      capital: item.capitals?.[0]?.name ?? "N/A",
      population: item.population ?? 0,
      continent: item.continents?.[0] ?? "N/A",
      code: item.codes?.alpha_3 ?? "N/A",
      languages:
        item.languages?.map((lang) => lang.name).join(", ") ?? "N/A",
      flag: item.flag?.url_png || item.flag?.url_svg || "",
    }));

    // saveToJson(countryData)

    return countryData;
  } catch (error) {
    toast.error("Error Getting Details");
    console.error("Error fetching country data:", error);
    throw error;
  }
};
