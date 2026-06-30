import React from "react";
import { CircleArrowRight, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const ProfileRecentActivity = () => {
  const Recent_activity = useSelector(
    (state: RootState) => state.recentActivity.recentActivities,
  );

  const handleTime = (time: string) => {
    const now = Date.now();
    const past = new Date(time).getTime();

    const diff = Math.floor((now - past) / 1000); 

    if (diff < 60) return `${diff} sec ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="w-full p-4 md:p-5 flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Recent Activity
        </h2>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-850 max-h-64 md:max-h-80 overflow-y-auto pr-1 md:pr-2">
        {Recent_activity.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <h1 className="text-sm text-zinc-500 dark:text-zinc-400">
              No Recent Activity
            </h1>
          </div>
        ) : (
          Recent_activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0 group cursor-pointer gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Clock className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />

                <div className="min-w-0">
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 block truncate">
                    {item.activity}
                  </span>

                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mt-0.5">
                    {handleTime(item.time)}
                  </span>
                </div>
              </div>

              <CircleArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileRecentActivity;