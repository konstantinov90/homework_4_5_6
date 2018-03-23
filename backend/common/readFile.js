import fs from 'fs';

const readFile = (readPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(readPath, (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        });
    });
};

export default readFile;
