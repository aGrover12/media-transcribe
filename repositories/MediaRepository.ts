import { Results } from "../constants/Results";
import { IMediaRepository } from "../interfaces/IMediaRepository";
import { InsertMediaResult } from "../models/InsertMediaResult";
import { Media } from "../models/Media";

let dbmgr = require("./DatabaseManager"); 
let db = dbmgr.db;

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

}