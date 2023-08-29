import { IMediaRepository } from '../interfaces/IMediaRepository';
import { Media } from '../models/Media';

export class StubRepository implements IMediaRepository {
   public meidaInformation: Media[] = [];

   public insert(media: Media): void {
      this.meidaInformation.push(media);
   }

   public async retrieve(id: Number): Promise<Media> {
    let media = <Media>this.meidaInformation.find(information => information.id === id);
    return media;
   }

  public async retrieveAll(): Promise<Media[]> {
   return this.meidaInformation;
  }  

  public async remove(id: Number) {
   let media = <Media>this.meidaInformation.find(information => information.id === id);
   const index = this.meidaInformation.indexOf(media, 0);
   if (index > -1) {
      this.meidaInformation.splice(index, 1);
   }
  }
}  