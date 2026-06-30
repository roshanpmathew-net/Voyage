import { type ReactNode } from "react";

interface Details {
  label: string;
  icon: ReactNode;
  value: string | number;
}

interface DetailCardProps {
  details: Details;
}

const DetailCard = ({ details }: DetailCardProps) => {
  return (
    <div className="group bg-blue-100/80 dark:bg-slate-900/60 backdrop-blur-sm border border-blue-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-200 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 mb-4">
        {details.icon}
      </div>

      <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-slate-400">
        {details.label}
      </p>

      <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-slate-50 wrap-break-word">
        {details.value}
      </h3>
    </div>
  );
};

export default DetailCard;