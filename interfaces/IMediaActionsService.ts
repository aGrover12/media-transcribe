import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";

export interface IMediaAcitonsService {
    insertMedia: (media: Media) => Promise<InsertMediaResult>;
    retrieveMedia: (id: number) => Promise<RetrieveMediaResult>;
} 