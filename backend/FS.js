const fs = require('fs');

class FS {
    static readFile(readPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(readPath, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }

    static readDir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }

                resolve(files);
            });
        });
    }
}

module.exports = FS;
