import { useEffect, useState } from "react";
import type { Destination } from "../Globe/GlobeDiv";
import { getImages } from "@/services/Image";
import DestinationFullGallery from "./DestinationFullGallery";

interface DestinationGalleryProps {
  destination: Destination;
}

interface ImageType {
  src: string;
  alt: string;
}

const DestinationGallery = ({ destination }: DestinationGalleryProps) => {
  const [mainImage, setMainImage] = useState("");
  const [sideImages, setSideImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const images = await getImages(destination.name.toLowerCase(), 4);

        if (images && images.length > 0) {
          setMainImage(images[0].src);
          setSideImages(images.slice(1));
        }
      } catch (e) {
        console.error("Failed to fetch gallery images:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [destination.name]);

  return (
    <div className="lg:col-span-2 flex flex-col gap-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
          About {destination.name}
        </h2>
        <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          <p>{destination.longDescription || destination.description}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Visual Exploration
          </h2>
          <button
            onClick={() => setIsOpen(true)}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400  cursor-pointer"
          >
            View All
          </button>
        </div>

        {loading ? (
          <div className="h-66 w-full bg-slate-50 dark:bg-slate-950 animate-pulse rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
            Loading gallery layout...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 h-66 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={
                  mainImage ||
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                }
                alt={`${destination.name} primary view`}
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-66">
              <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                <img
                  src={sideImages[0]?.src || mainImage}
                  alt={`${destination.name} perspective`}
                  className="w-full h-full object-cover brightness-95 filter sepia-10"
                />
              </div>

              <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                <img
                  src={sideImages[1]?.src || mainImage}
                  alt={`${destination.name} landscape details`}
                  className="w-full h-full object-cover brightness-75 filter hue-rotate-15"
                />
              </div>
            </div>

            <div
              className={`fixed inset-0 z-50 ${
                isOpen ? "flex" : "hidden"
              } items-center justify-center p-4`}
            >
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-xs"
                onDoubleClick={() => setIsOpen(false)}
              />

              <DestinationFullGallery
                name={destination.name}
                setOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationGallery;
