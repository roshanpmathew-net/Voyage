

const TopleftComp = () => {
  return (
     <div className="hidden md:block absolute top-8 left-4 md:left-8 z-10 w-[90%] md:w-auto max-w-88 pointer-events-none">
        <div className="rounded-3xl bg-slate-950/80 dark:bg-blue-50/90 p-6 backdrop-blur-xl shadow-2xl border border-slate-800 dark:border-blue-200/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 dark:text-blue-800">
              Navigate & Explore
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight text-white dark:text-slate-900">
            Popular <br />
            <span className="bg-gradient-to-br from-blue-400 to-indigo-300 dark:from-blue-600 dark:to-blue-400 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>

          <p className="mt-3 text-sm md:text-base font-medium text-slate-300 dark:text-blue-900/80">
            Through regions around the world.
          </p>
        </div>
      </div>
  );
};

export default TopleftComp;