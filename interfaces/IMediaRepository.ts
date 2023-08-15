import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";

export interface IMediaRepository {
    Insert : (media: Media)  =>  void; 
    Retrieve : (id: Number) => Media;
}