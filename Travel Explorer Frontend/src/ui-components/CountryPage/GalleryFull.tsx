import { useEffect, useState } from "react";
import { getImages, type CountryImage } from "@/services/Image";
import Loader from "../Common/Loader";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  name?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GalleryFull = ({ name, setOpen }: GalleryProps) => {
  const [images, setImages] = useState<CountryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await getImages(name!, 30);
        setImages(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllImages();
  }, [name]);

  return (
    <div className="relative bg-white rounded-xl shadow-lg w-full md:w-4/5 lg:w-[95%] xl:w-[90%] max-h-[90vh] overflow-y-auto dark:bg-gray-950">
      {loading && (
        <div className="flex items-center justify-center p-10">
          <Loader />
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">Gallery</h2>

          <Button className={'cursor-pointer'} onClick={() => setOpen(false)}>Close</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map((image, index) => (
    <div key={index} className="relative group">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-auto rounded-lg"
      />

      <div
        className="
          absolute bottom-2 left-2 right-2
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          bg-black/75 text-white text-sm
          p-2 rounded
          pointer-events-none
        "
      >
        {image.alt}
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default GalleryFull;
