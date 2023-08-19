import { IMediaRepository } from '../interfaces/IMediaRepository';
import { Media } from '../models/Media';

export class StubRepository implements IMediaRepository {
   public meidaInformation: Media[] = [];

   public Insert(media: Media) : void {
        this.meidaInformation.push(media);
   }

   public async Retrieve(id: Number) : Promise<Media> {
    let media = <Media>this.meidaInformation.find(information => information.id === id);
    return media;
   }
}  