export interface CountryImage {
  src: string;
  alt: string;
}

interface PexelsPhoto {
  src: {
    medium: string;
    landscape: string;
  };
  alt: string;
}

const PEXELS_AUTH = import.meta.env.VITE_PEXELS_API_KEY;

export const getImage = async (name: string): Promise<CountryImage> => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        `${name} landmarks`,
      )}&per_page=5&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_AUTH,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch image details");
    }

    const data = await res.json();

    const photos = data.photos as PexelsPhoto[];

    if (!photos?.length) {
      throw new Error("No images found");
    }

    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomImage = photos[randomIndex];

    return {
      src: randomImage.src.landscape,
      alt: randomImage.alt,
    };
  } catch (e) {
    console.error("Error fetching image:", e);
    throw e;
  }
};
export const getImages = async (
  name: string,
  limit: number,
): Promise<CountryImage[]> => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        `${name} landmarks`,
      )}&per_page=${limit}&orientation=landscape`,

      {
        headers: {
          Authorization: PEXELS_AUTH,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Image details");
    }
    const data = await res.json();

    const imageData: CountryImage[] = (data.photos as PexelsPhoto[])
      .slice(1)
      .map((image) => ({
        src: image.src.medium,
        alt: image.alt,
      }));

    return imageData;
  } catch (e) {
    console.error("Error fetching country details:", e);
    throw e;
  }
};
