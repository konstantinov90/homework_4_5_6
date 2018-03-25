const {exec} = require('child_process');

class GitCLI {
    static command(str, opt = {}) {
        return new Promise((resolve, reject) => {
            exec(str, opt, (error, commits, stderr) => {
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

module.exports = GitCLI;
