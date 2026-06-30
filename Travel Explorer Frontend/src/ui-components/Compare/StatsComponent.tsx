import { StatProgress } from "./StatProgress";
import { CircleDollarSign, BusFront, ShieldCheck } from "lucide-react";
import type { CountryDetails } from "@/pages/Compare";

interface StatsProps {
  CountryProps: CountryDetails;
  bgcolor: string;
  text_color: string;
}

const StatsComponent = ({ CountryProps, bgcolor, text_color }: StatsProps) => {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div>
        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <CircleDollarSign size={18} className={text_color} />
            <span className="text-sm sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
              Cost of Living
            </span>
          </div>

          <span className="rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
            Avg / Day
          </span>
        </div>

        <StatProgress
          value={CountryProps.costOfLivingPerDayUSD}
          max={200}
          color={bgcolor}
        />

        <p className={`mt-1 text-sm font-semibold ${text_color}`}>
          ${CountryProps.costOfLivingPerDayUSD}/day
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <BusFront size={18} className={text_color} />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 sm:text-sm">
              Infrastructure Quality
            </span>
          </div>

          <span className="rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
            Efficiency Score
          </span>
        </div>

        <StatProgress
          value={CountryProps.infrastructureRating}
          max={10}
          color={bgcolor}
        />

        <p className={`mt-1 text-sm font-semibold ${text_color}`}>
          {CountryProps.infrastructureRating}/10
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className={text_color} />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 sm:text-sm">
              Safety Index
            </span>
          </div>

          <span className="rounded-full bg-white dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
            Global Ranking
          </span>
        </div>

        <StatProgress
          value={CountryProps.safetyScore}
          max={10}
          color={bgcolor}
        />

        <p className={`mt-1 text-sm font-semibold ${text_color}`}>
          {CountryProps.safetyScore}/10
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-4 border border-slate-100 dark:border-slate-700/50">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Climate</p>
          <h3
            className={`mt-1 text-base sm:text-sm font-semibold ${text_color} line-clamp-2`}
          >
            {CountryProps.climate}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-4 border border-slate-100 dark:border-slate-700/50">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Top Industry</p>
          <h3
            className={`mt-1 text-base sm:text-sm font-semibold ${text_color} line-clamp-2`}
          >
            {CountryProps.topIndustry}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;