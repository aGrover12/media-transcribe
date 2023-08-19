const path = require('path');
const sqlite = require('better-sqlite3-with-prebuilds');
const db = new sqlite(path.resolve(__dirname, "../media.db") , {fileMustExist: true, verbose: console.log});
db.pragma('journal_mode = WAL');
exports.db = db;