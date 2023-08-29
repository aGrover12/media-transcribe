import { Media } from "../models/Media";

export interface IMediaRepository {
    insert: (media: Media)  =>  void; 
    retrieve: (id: Number) => Promise<Media>;
    retrieveAll: () => Promise<Media[]>;
    remove: (id: Number) => void;
}