import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";
import { RetrieveAllMediaResult } from "../models/RetrieveAllMediaResult";
import { RemoveMediaResult } from "../models/RemoveMediaResult";

export interface IMediaAcitonsService {
    insertMedia: (media: Media) => Promise<InsertMediaResult>;
    retrieveMedia: (id: Number) => Promise<RetrieveMediaResult>;
    retrieveAll: () => Promise<RetrieveAllMediaResult>;
    removeMedia: (id: Number) => Promise<RemoveMediaResult>;
} 