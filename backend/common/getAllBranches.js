import fs from 'fs';
const path = process.env.ROOT;

const getAllBranches = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(`${path}/.git/refs/heads`, (err, files) => {
            if (err) {
                reject(err);
            }

            resolve(files);
        });
    });
};

export default getAllBranches;
