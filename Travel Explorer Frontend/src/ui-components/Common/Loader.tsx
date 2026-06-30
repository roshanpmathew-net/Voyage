const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
      <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/15 blur-xl scale-125" />

        {/* Spinner */}
        <div
          className="
            relative w-24 h-24 rounded-full animate-spin
            border-4
            border-gray-200 dark:border-slate-800
            border-t-blue-500 dark:border-t-blue-400
          "
        />

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full p-1 bg-white dark:bg-slate-900 shadow-md">
            <img
              src="/images/Logo.png"
              alt="Travel Explorer"
              className="w-12 h-12 rounded-full object-cover animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;