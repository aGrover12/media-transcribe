import { Media } from "../models/media";

export interface IMediaRepository {
    Insert : (media: Media)  =>  void; 
    Retrieve : (id: number) => Media;
}