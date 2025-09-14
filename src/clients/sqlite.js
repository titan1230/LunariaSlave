const db = require('better-sqlite3')(process.cwd() + '/data.db', { fileMustExist: true });

module.exports = db;