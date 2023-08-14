import { Results } from '../constants/Results';
import { IMediaRepository } from '../interfaces/IMediaRepository';
import { InsertMediaResult } from '../models/InsertMediaResult';
import { Media } from '../models/Media';
import { RetrieveMediaResult } from '../models/RetrieveMediaResult';

export class StubRepository implements IMediaRepository {
   public meidaInformation: Media[] = [];

   public Insert(media: Media) : InsertMediaResult {
        this.meidaInformation.push(media);
        return new InsertMediaResult({
         successful: true,
         message: Results.SUCCESS
        });
   }

   public Retrieve(id: Number) : RetrieveMediaResult {
    let media = <Media>this.meidaInformation.find(information => information.id === id);
    return new RetrieveMediaResult({
      media: media,
      successful: true,
      message: Results.SUCCESS
    });
   }
}  