import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Media }  from "../models/Media";
import { IMediaAcitons } from "../interfaces/IMediaActions";
import { Locator } from "../locators";
import { IMediaRepository } from "../interfaces/IMediaRepository";
import { InsertMediaResult } from "../models/InsertMediaResult";
import { RetrieveMediaResult } from "../models/RetrieveMediaResult";
import { Results } from "../constants/Results";

@injectable()
export class MediaAcitons implements IMediaAcitons {
    private _repository: IMediaRepository;

    public constructor(
        @inject(Locator.IMediaRepository) repository: IMediaRepository
    ) {
        this._repository = repository;
    }

    public insertMedia(media : Media) {
        let result: InsertMediaResult;

        try {
            this._repository.Insert(media);
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

    public retrieveMedia(id: Number) : RetrieveMediaResult{
        let result: RetrieveMediaResult;

        try {
            let media = this._repository.Retrieve(id);
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