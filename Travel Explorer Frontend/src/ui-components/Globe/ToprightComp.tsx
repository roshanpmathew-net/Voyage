interface TopRightProps{
    handleRandomize: () => void
}

const ToprightComp = ({handleRandomize}: TopRightProps) => {
  return (
    <div className="absolute top-8 right-4 md:right-8 z-10 flex flex-col items-end gap-3 pointer-events-none">
      <div className="flex items-center gap-2.5 rounded-2xl bg-slate-950/80 dark:bg-blue-50/90 px-4 py-2.5 backdrop-blur-xl border border-slate-800 dark:border-blue-200/60 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-sm font-medium text-white dark:text-slate-900">
          1,420 exploring
        </span>
      </div>

      <button
        onClick={handleRandomize}
        className="pointer-events-auto flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-950/80 dark:bg-blue-50/90 px-4 py-2.5 text-sm font-medium text-white dark:text-slate-900 backdrop-blur-xl border border-slate-800 dark:border-blue-200/60 shadow-sm transition-all hover:bg-slate-900 dark:hover:bg-white active:scale-[0.98]"
      >
        Teleport Me
      </button>
    </div>
  );
};

export default ToprightComp;
