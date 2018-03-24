import moment from "moment/moment";
import options from "../options";
const {exec} = require('child_process');

export default class GitCLI {
    static getAllCommitsOfBranch() {
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
        })
    }
}