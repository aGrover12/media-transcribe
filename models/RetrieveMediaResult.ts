import { Media } from "./Media";

export class RetrieveMediaResult {
    media?: Media;
    successful: boolean;
    message: string;

    constructor(result: RetrieveMediaResult) {
        this.media = result.media;
        this.successful = result.successful;
        this.message = result.message;
    }
}