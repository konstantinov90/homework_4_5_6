const {exec} = require('child_process');

const getDefaultBranch = () => {
    return new Promise((resolve, reject) => {
        exec('git rev-parse --abbrev-ref HEAD', (error, stdout, stderr) => {
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

export default getDefaultBranch;
