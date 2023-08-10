export class InsertMediaResult {
    successful: boolean;
    message: string;

    constructor(result: InsertMediaResult) {
        this.successful = result.successful;
        this.message = result.message;
    }
}