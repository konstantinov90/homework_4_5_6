const {exec} = require('child_process');

const getContentTreeByPath = (hash, path) => {
    return new Promise((resolve, reject) => {
        exec(`git ls-tree ${hash}:./${path}`, (error, stdout, stderr) => {
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

export default getContentTreeByPath;
