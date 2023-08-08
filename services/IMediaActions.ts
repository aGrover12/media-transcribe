import { Media } from "../models/media";

export interface IMediaAcitons {
    uploadMedia: (media: Media) => void;
    retrieveMedia: (id: number) => Media;
} 