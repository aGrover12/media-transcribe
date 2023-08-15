import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";

export interface IMediaAcitons {
    insertMedia: (media: Media) => InsertMediaResult;
    retrieveMedia: (id: number) => RetrieveMediaResult;
} 