const {exec} = require('child_process');
const path = process.env.ROOT;

const getAllCommitsOfBranch = (branch) => {
    return new Promise((resolve, reject) => {
        exec(`cd ${path} && git log ${branch} --pretty=format:"%h, %s, %cn, %cd"`, (error, stdout, stderr) => {
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

export default getAllCommitsOfBranch;
