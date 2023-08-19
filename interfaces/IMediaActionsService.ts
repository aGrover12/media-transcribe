import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";
import { RetrieveAllMediaResult } from "../models/RetrieveAllMediaResult";

export interface IMediaAcitonsService {
    insertMedia: (media: Media) => Promise<InsertMediaResult>;
    retrieveMedia: (id: number) => Promise<RetrieveMediaResult>;
    retrieveAll: () => Promise<RetrieveAllMediaResult>;
} 