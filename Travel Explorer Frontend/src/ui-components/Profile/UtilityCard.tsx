import { type ReactNode } from "react";
import { Progress } from "@/components/ui/progress";

interface UtilityCardProps {
  headerText: string;
  value: number;
  max: number;
  icon: ReactNode;
}

const UtilityCard = ({ headerText, icon, value, max }: UtilityCardProps) => {
  return (
    <div className="w-full p-4 sm:p-5 border-l-4 rounded-3xl border-l-[#2563EB]">
      <div className="flex w-full justify-between">
        <h1 className="font-bold  text-slate-600 dark:text-slate-300">
          {headerText}
        </h1>
        <span>{icon}</span>
      </div>
      <div>
        <h1 className="py-4">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2563EB]">
            {value}
          </span>

          <span className="ml-1 text-xs sm:text-sm text-slate-600">
            Across 250 Countries
          </span>
        </h1>
        <Progress
          value={value}
          max={max}
          indicatorClassName={"bg-blue-600"}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default UtilityCard;
