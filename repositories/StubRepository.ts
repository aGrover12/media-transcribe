import { IMediaRepository } from '../repositories/IMediaRepository';
import { Media } from '../models/media';

export class StubRepository implements IMediaRepository {
   private meidaInformation: Media[]

   public Insert(media: Media) : void {
        this.meidaInformation.push(media);
   }

   public Retrieve(id: number) : Media {
    let media = <Media>this.meidaInformation.find(information => information.id === id);
    return media;
   }
}  