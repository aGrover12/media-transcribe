import { Media } from "./Media";

export class RetrieveAllMediaResult {
    mediaList?: Media[];
    successful: boolean;
    message: string;

    constructor(result: RetrieveAllMediaResult) {
        this.mediaList = result.mediaList;
        this.successful = result.successful;
        this.message = result.message;
    }
}