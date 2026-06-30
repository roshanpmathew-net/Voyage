import { useEffect, useState } from "react";
import { getImages, type CountryImage } from "@/services/Image";
import GallerySkeleton from "./GallerySkel";

interface GalleryProps {
  name?: string;
}

const ImageGallery = ({ name }: GalleryProps) => {
 const [images, setImages] = useState<CountryImage[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchImages = async () => {
    if (!name) return;

    try {
      setLoading(true);

      const res = await getImages(name, 5);
      setImages(res);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchImages();
}, [name]);

  if (loading) {
  return <GallerySkeleton />;
}
  const imageClass =
  "w-full h-full object-cover";
  return (
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
      <div
        className="
          overflow-hidden rounded-2xl group cursor-pointer
          sm:col-span-1
          lg:col-span-6 lg:row-span-2
        "
      >
        <img
          src={images[0].src}
          alt={images[0].alt}
          className={imageClass}
        />
      </div>

      <div
        className="
          overflow-hidden rounded-2xl group cursor-pointer
          sm:col-span-1
          lg:col-span-3 lg:row-span-1
        "
      >
        <img
          src={images[1].src}
          alt={images[1].alt}
          className={imageClass}
        />
      </div>

      <div
        className="
          overflow-hidden rounded-2xl group cursor-pointer
          sm:col-span-1
          lg:col-span-3 lg:row-span-2
        "
      >
        <img
          src={images[2].src}
          alt={images[2].alt}
          className={imageClass}
        />
      </div>

      <div
        className="
          overflow-hidden rounded-2xl group cursor-pointer
          sm:col-span-1
          lg:col-span-3 lg:row-span-1
        "
      >
        <img
          src={images[3].src}
          alt={images[3].alt}
          className={imageClass}
        />
      </div>
    </div>
  );
};

export default ImageGallery;