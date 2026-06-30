import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DestData from "@/data/Dest.json";

interface SelectProp {
  destination: string;
  destinationValue: string;
  otherSelected: string;
  setDestinationValue: React.Dispatch<React.SetStateAction<string>>;
}
export function CustomSelect({
  destination,
  destinationValue,
  otherSelected,
  setDestinationValue,
}: SelectProp) {

  const MapData = Object.fromEntries(
  Object.entries(DestData).filter(([code]) => code !== otherSelected)
);


  


  return (
    <Select
      value={destinationValue}
      onValueChange={(value) => {
        if (value) {
          setDestinationValue(value);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Country" />
      </SelectTrigger>

      <SelectContent className="w-(--radix-select-trigger-width)">
        <SelectGroup>
          <SelectLabel>{destination}</SelectLabel>

          {Object.entries(MapData).map(([code, countryName]) => (
            <SelectItem key={code} value={code}>
              <div className="flex w-full justify-between">
                <span>{countryName}</span>
                <span className="text-xs text-muted-foreground">{code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
