const {exec} = require('child_process');

export default class GitCLI {
    static api(str) {
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
