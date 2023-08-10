export class Media {
    id: Number;
    title: String;
    directory: String;

    constructor(data: Media) {
        this.id = data.id;
        this.title = data.title;
        this.directory = data.directory;
    }
}