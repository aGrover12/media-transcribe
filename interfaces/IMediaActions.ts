import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";

export interface IMediaAcitons {
    uploadMedia: (media: Media) => InsertMediaResult;
    retrieveMedia: (id: number) => Media;
} 