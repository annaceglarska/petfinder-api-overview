import React, { useMemo } from "react";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import Carousel from "react-material-ui-carousel";
import { mergePhotosVideos } from "./helpers/AnimalPhoto.helpers";

export interface PhotosProps {
  photos: Pet["photos"] | undefined;
  videos?: Pet["videos"] | undefined;
}

const PhotosCarousel: React.FC<PhotosProps> = ({ photos, videos }) => {
  const isOnlyOneElement: boolean =
    Number(photos?.length) + Number(videos?.length) === 1;

  const data = useMemo(() => {
    return mergePhotosVideos(photos, videos);
  }, [photos, videos]);

  return (
    <Carousel
      height={600}
      navButtonsAlwaysInvisible={isOnlyOneElement}
      indicators={!isOnlyOneElement}
      autoPlay={false}
      sx={{
        textAlign: "center",
      }}
    >
      {data.map(({ type, value }) => {
        if (type === "photo") {
          return (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              style={{ height: "100%" }}
              src={value.medium}
              key={value.medium}
              alt="Pet photo"
            />
          );
        } else if (type === "video") {
          return <video src={value}></video>;
        } else {
          return <></>;
        }
      })}
    </Carousel>
  );
};

export default PhotosCarousel;
