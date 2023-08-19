import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Media }  from "../models/Media";
import { IMediaAcitonsService } from "../interfaces/IMediaActionsService";
import { Locator } from "../locators";
import { IMediaRepository } from "../interfaces/IMediaRepository";
import { InsertMediaResult } from "../models/InsertMediaResult";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";
import { Results } from "../constants/Results";

@injectable()
export class MediaAcitonsService implements IMediaAcitonsService {
    private _repository: IMediaRepository;

    public constructor(
        @inject(Locator.IMediaRepository) repository: IMediaRepository
    ) {
        this._repository = repository;
    }

    public async insertMedia(media : Media) {
        let result: InsertMediaResult;

        try {
           await this._repository.Insert(media);
            result = new InsertMediaResult({
                successful: true,
                message: Results.SUCCESS
            });
        }
        catch(error) {
            result = new InsertMediaResult({
                successful: false, 
                message: `${Results.FAILURE}: ${error}`
            });
        }

        return result
    }

    public async retrieveMedia(id: Number) : Promise<RetrieveMediaResult>{
        let result: RetrieveMediaResult;

        try {
            let media = await this._repository.Retrieve(id);
            if (media === null || media === undefined) {
                throw ("Media not found");
            }

            result = new RetrieveMediaResult({
                media: media,
                successful: true,
                message: `${Results.SUCCESS}`
            });
        }
        catch(error) {
            result = new RetrieveMediaResult({
                successful: false,
                message: `${Results.FAILURE}: ${error}`
            });
        }

        return result;
    }
}