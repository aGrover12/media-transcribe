import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Media }  from "../models/Media";
import { IMediaAcitons } from "../interfaces/IMediaActions";
import { Locator } from "../locators";
import { IMediaRepository } from "../interfaces/IMediaRepository";
import { InsertMediaResult } from "../models/InsertMediaResult";

@injectable()
export class MediaAcitons implements IMediaAcitons {
    private _repository: IMediaRepository;

    public constructor(
        @inject(Locator.IMediaRepository) repository: IMediaRepository
    ) {
        this._repository = repository;
    }

    public uploadMedia(media : Media) {
        let result: InsertMediaResult;

        try {
            this._repository.Insert(media);

            result = new InsertMediaResult({
                successful: true,
                message: "Successful Upload"
            });
        }
        catch(error) {
            result = new InsertMediaResult({
                successful: false, 
                message: `Failed to upload media due to the following error: ${error}`
            });
        }

        return result
    }

    public retrieveMedia(id: Number) : Media{
        // We'll pass the id to the database from here
        return this._repository.Retrieve(id);
    }
}