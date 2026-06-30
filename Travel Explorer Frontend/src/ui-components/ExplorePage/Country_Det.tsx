import { type CountryDetails } from "@/services/CountryDet";
import DetailCard from "./DetailCard";
import {
  Building2,
  Users,
  LandPlot,
  Banknote,
  Clock,
  Languages,
} from "lucide-react";

interface CountryProps {
  item: CountryDetails;
}

const CountryDet = ({ item }: CountryProps) => {
  const data = [
    { label: "Capital", icon: <Building2 />, value: item.capital },
    {
      label: "Population",
      icon: <Users />,
      value:
      item.population >= 1_000_000_000
        ? `${(item.population / 1_000_000_000).toFixed(1)}B`
        : item.population >= 1_000_000
          ? `${(item.population / 1_000_000).toFixed(1)}M`
          : item.population >= 1_000
            ? `${(item.population / 1_000).toFixed(0)}K`
            : item.population.toString(),
    },
    {
      label: "Total Area",
      icon: <LandPlot />,
      value: `${item.area.toLocaleString()} km²`,
    },
    { label: "Currency", icon: <Banknote />, value: item.currency },
    { label: "Languages", icon: <Languages />, value: item.languages },
    {
      label: "Timezone",
      icon: <Clock />,
      value: `${item.timezone[0]} to ${
        item.timezone[item.timezone.length - 1]
      }`,
    },
  ];
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map((card, index) => (
          <DetailCard key={index} details={card} />
        ))}
      </div>
    </div>
  );
};

export default CountryDet;
