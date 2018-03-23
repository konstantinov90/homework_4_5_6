const {exec} = require('child_process');

const getBlobContent = (hash, path) => {
    return new Promise((resolve, reject) => {
        exec(`git show ${hash}:./${path}`, {maxBuffer: 500 * 1024}, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }

            if (stderr) {
                reject(stderr);
            }

            resolve(stdout);
        });
    });
};

export default getBlobContent;
