import { IMediaRepository } from "../interfaces/IMediaRepository";
import { Media } from "../models/Media";

let Dbmgr = require("./DatabaseManager");
let db = Dbmgr.db;

export class MediaRepository implements IMediaRepository {
    public async insert(media: Media) {
        const query = `INSERT INTO MediaInfo (Title, Directory) VALUES (?, ?)`
        let statment = await db.prepare(query);
        statment.run(media.title, media.directory);
    };

    public async retrieve(id: Number): Promise<Media> {
        const query = `SELECT * FROM MediaInfo WHERE id = ?`;    
        let media: Media = await <Media> db.prepare(query).get(id);
        return media;
    };

    public async retrieveAll(): Promise<Media[]> {
        const query = `SELECT * FROM MediaInfo`;    
        let media: Media[] = await <Media[]> db.prepare(query).all();
        return media;
    }

    public async remove(id: Number) {
        const query = `DELETE FROM MediaInfo WHERE id = ?`;
        let statment = await db.prepare(query);
        statment.run(id);
    }
}