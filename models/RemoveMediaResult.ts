import { Media } from "./Media";

export class RemoveMediaResult {
    successful: boolean;
    message: string;

    constructor(result: RemoveMediaResult) {
        this.successful = result.successful;
        this.message = result.message;
    }
}