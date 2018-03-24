const {exec} = require('child_process');
const path = process.env.ROOT;

export default class GitCLI {
    static getAllCommitsOfBranch(branch) {
        return new Promise((resolve, reject) => {
            exec(`cd ${path} && git log ${branch} --pretty=format:"%h^^ %s^^ %cn^^ %cd"`, (error, commits, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                resolve(commits);
            });
        });
    }

    static API(str) {
        return new Promise((resolve, reject) => {
            exec(str, (error, commits, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                resolve(commits);
            });
        });
    }
}
