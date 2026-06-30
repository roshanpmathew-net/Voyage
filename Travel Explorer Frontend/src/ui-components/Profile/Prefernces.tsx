import { ProfileCurrencySelect } from "./ProfileSelect";
import PrivateToggle from "./ProfileToggle";

const Prefernces = () => {
  return (
    <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 p-4 md:p-5 flex gap-4 flex-col">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">Preferences</h2>
      </div>
      <div className="flex flex-col gap-5 mt-2">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">Email Notifications</h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">Travel deals & updates</p>
          </div>
          <div className="shrink-0">
            <PrivateToggle/>
          </div>
        </div>
        
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">Private Profile</h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">Make your Favorites Private</p>
          </div>
          <div className="shrink-0">
            <PrivateToggle/>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">Currency</h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">Current: USD($)</p>
          </div>
          <div className="shrink-0">
            <ProfileCurrencySelect/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prefernces;