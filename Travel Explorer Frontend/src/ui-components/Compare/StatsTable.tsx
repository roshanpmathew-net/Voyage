import type { CountryDetails } from "@/pages/Compare";

interface StatTableProps {
  countryA: CountryDetails;
  countryB: CountryDetails;
}

const StatsTable = ({ countryA, countryB }: StatTableProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-10">
      <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="grid grid-cols-3 bg-slate-200 dark:bg-slate-800/80 text-sm font-semibold">
          <div className="border-r border-slate-300 dark:border-slate-700 px-5 py-4 text-slate-900 dark:text-slate-200">
            Feature
          </div>

          <div className="border-r border-slate-300 dark:border-slate-700 px-5 py-4 text-center text-blue-700 dark:text-blue-400">
            {countryA?.country}
          </div>

          <div className="px-5 py-4 text-center text-green-600 dark:text-green-500">
            {countryB?.country}
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm">
          <div className="px-5 py-5 font-medium text-slate-900 dark:text-slate-300">
            Language
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400 border-r border-transparent dark:border-slate-800">
            {countryA?.languages.join(", ")}
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400">
            {countryB?.languages.join(", ")}
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm">
          <div className="px-5 py-5 font-medium text-slate-900 dark:text-slate-300">
            Visa Difficulty
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400 border-r border-transparent dark:border-slate-800">
            {countryA?.visaDifficulty}
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400">
            {countryB?.visaDifficulty}
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm">
          <div className="px-5 py-5 font-medium text-slate-900 dark:text-slate-300">
            Best Time to Visit
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400 border-r border-transparent dark:border-slate-800">
            {countryA?.bestTimeToVisit}
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400">
            {countryB?.bestTimeToVisit}
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm">
          <div className="px-5 py-5 font-medium text-slate-900 dark:text-slate-300">
            Hospitality
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400 border-r border-transparent dark:border-slate-800">
            {countryA?.touristFriendliness}/10
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400">
            {countryB?.touristFriendliness}/10
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm">
          <div className="px-5 py-5 font-medium text-slate-900 dark:text-slate-300">
            Public Transport
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400 border-r border-transparent dark:border-slate-800">
            {countryA?.transportOptions.join(" / ")}
          </div>

          <div className="px-5 py-5 text-center text-slate-700 dark:text-slate-400">
            {countryB?.transportOptions.join(" / ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
