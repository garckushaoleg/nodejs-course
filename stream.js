const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), { encoding: 'utf8'});
const ws = fs.createWriteStream(path.join(__dirname, "files", "writableFile.txt"));
rs.pipe(ws);