import { IMediaRepository } from "../interfaces/IMediaRepository";
import { Media } from "../models/Media";

let Dbmgr = require("./DatabaseManager");
let db = Dbmgr.db;

export class MediaRepository implements IMediaRepository {
    public async Insert(media: Media)
    {
        const query = `INSERT INTO MediaInfo (Title, Directory) VALUES (?, ?)`
        let statment = await db.prepare(query);
        statment.run(media.title, media.directory);
    };

    public async Retrieve(id: Number): Promise<Media> {
        const query = `SELECT * FROM MediaInfo WHERE id = ?`;    
        let media: Media = await <Media> db.prepare(query).get(id);
        return media;
    };

    public async RetrieveAll(): Promise<Media[]> {
        const query = `SELECT * FROM MediaInfo`;    
        let media: Media[] = await <Media[]> db.prepare(query).all();
        return media;
    }
}