const GallerySkeleton = () => (
  <div
    className="
      grid gap-4
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-12
      auto-rows-[200px]
      lg:h-[450px]
    "
  >
    <div className="animate-pulse rounded-2xl bg-gray-300 sm:col-span-1 lg:col-span-6 lg:row-span-2" />

    <div className="animate-pulse rounded-2xl bg-gray-300 sm:col-span-1 lg:col-span-3 lg:row-span-1" />

    <div className="animate-pulse rounded-2xl bg-gray-300 sm:col-span-1 lg:col-span-3 lg:row-span-2" />

    <div className="animate-pulse rounded-2xl bg-gray-300 sm:col-span-1 lg:col-span-3 lg:row-span-1" />
  </div>
);

export default GallerySkeleton