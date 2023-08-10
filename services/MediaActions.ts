import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Media }  from "../models/media";
import { IMediaAcitons } from "../interfaces/IMediaActions";
import { Locator } from "../locators";
import { IMediaRepository } from "../interfaces/IMediaRepository";

@injectable()
export class MediaAcitons implements IMediaAcitons {
    private _repository: IMediaRepository;

    public constructor(
        @inject(Locator.IMediaRepository) repository: IMediaRepository
    ) {
        this._repository = repository;
    }

    public uploadMedia(media : Media) {
        // We'll upload information to database from here
        this._repository.Insert(media);
    }

    public retrieveMedia(id: Number) : Media{
        // We'll pass the id to the database from here
        return new Media({
            id: 1,
            title: "TODO",
            directory: "Not/Real/Fake"
        });
    }
}