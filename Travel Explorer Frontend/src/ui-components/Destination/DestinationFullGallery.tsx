import { useState, useEffect } from "react";
import type { CountryImage } from "@/services/Image";
import { getImages } from "@/services/Image";
import Loader from "../Common/Loader";
import { Button } from "@/components/ui/button";

interface DestinationGalleryProps {
  name?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DestinationFullGallery = ({ name, setOpen }: DestinationGalleryProps) => {
  const [images, setImages] = useState<CountryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    const getAllImages = async () => {
      try {
        setLoading(true);
        const res = await getImages(name.toLowerCase(), 30);
        setImages(res || []);
      } catch (error) {
        console.error("Error fetching full gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllImages();
  }, [name]);

  return (
    <div className="relative bg-white rounded-xl shadow-lg w-full md:w-4/5 lg:w-[95%] xl:w-[90%] max-h-[90vh] overflow-y-auto dark:bg-gray-950 transition-colors duration-300">
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 min-h-[40vh]">
          <Loader />
          <p className="text-sm text-slate-500 mt-4 animate-pulse">Assembling gallery...</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {name ? `${name} Gallery` : "Gallery"}
            </h2>
            <Button className="cursor-pointer" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>

          {!loading && images.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              No images available for this destination.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div 
                key={image.src || index} 
                className="relative group aspect-square sm:aspect-video md:aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800"
              >
                <img
                  src={image.src}
                  alt={image.alt || "Destination imagery"}
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />

                {image.alt && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 pointer-events-none">
                    <p className="text-white text-xs font-medium line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationFullGallery;