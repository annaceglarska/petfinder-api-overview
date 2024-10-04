import { Pet, Photo, Video } from "../../../services/api/petfinder/pets/pets.types";


export type DataType = (PhotoData | VideoData)[];
export type PhotoData = { type: 'photo'; value: Photo }
export type VideoData = { type: 'video'; value: Video }
export const mergePhotosVideos = (photos: Pet["photos"] | undefined, videos: Pet["videos"] | undefined) => {
    const array: DataType = [];

    photos?.forEach((photo) => {
        array.push({
            type: "photo",
            value: photo,
        });
    });

    videos?.forEach((video) => {
        array.push({
            type: "video",
            value: video,
        });
    });

    return array;
}
