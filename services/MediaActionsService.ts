import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Media }  from "../models/Media";
import { IMediaAcitonsService } from "../interfaces/IMediaActionsService";
import { Locator } from "../locators";
import { IMediaRepository } from "../interfaces/IMediaRepository";
import { InsertMediaResult } from "../models/InsertMediaResult";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";
import { Results } from "../constants/Results";
import { RetrieveAllMediaResult } from "../models/RetrieveAllMediaResult";
import { RemoveMediaResult } from "../models/RemoveMediaResult";

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
           await this._repository.insert(media);
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

    public async removeMedia(id: Number) : Promise<RemoveMediaResult> {
        let result: RemoveMediaResult;

        try {
            await this._repository.remove(id);
            result = new RemoveMediaResult({
                successful: true,
                message: Results.SUCCESS
            });
        }
        catch(error) {
            result = new RemoveMediaResult({
                successful: false, 
                message: `${Results.FAILURE}: ${error}`
            });
        }

        return result;
    }

    public async retrieveMedia(id: Number) : Promise<RetrieveMediaResult> {
        let result: RetrieveMediaResult;

        try {
            let media = await this._repository.retrieve(id);
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

    public async retrieveAll(): Promise<RetrieveAllMediaResult> {
        let result: RetrieveAllMediaResult;

        try {
            let mediaList = await this._repository.retrieveAll();
            
            result = new RetrieveAllMediaResult({
                mediaList: mediaList,
                successful: true,
                message: `${Results.SUCCESS}`
            });
        }
        catch(error) {
            result = new RetrieveAllMediaResult({
                successful: false,
                message: `${Results.FAILURE}: ${error}`
            });
        }

        return result;
    }
}