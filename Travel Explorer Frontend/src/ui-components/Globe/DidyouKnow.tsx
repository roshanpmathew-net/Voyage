import type { Destination } from "./GlobeDiv";

interface DidyouKnowProps{
      selected: Destination | null; 

}
const DidyouKnow = ({selected}: DidyouKnowProps) => {
  return (
    <div className="relative rounded-2xl p-5 backdrop-blur-xl shadow-2xl bg-slate-950/80 dark:bg-blue-50/90 border border-slate-800 dark:border-blue-200/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 dark:bg-blue-200 dark:text-blue-700 text-sm">
                💡
              </span>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white dark:text-slate-900">
                Did you know?
              </h4>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-300 dark:text-blue-900/80 italic">
              {`"${selected!.didYouKnow}"`}
            </p>
          </div>
  );
};

export default DidyouKnow;