import { Media } from "../models/Media";

export interface IMediaRepository {
    Insert : (media: Media)  =>  void; 
    Retrieve : (id: Number) => Media;
}