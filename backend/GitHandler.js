const {exec} = require('child_process');
const path = process.env.ROOT;
import fs from 'fs';
import moment from 'moment';

import options from '../options';
moment.locale(options.timeLocale || 'ru');
import GitCLI from './GitCLI';

export default class GitHelper {

    static _sortTreeByType(arr) {
        return arr.sort((a, b) => {
            // первым делом сортируем по типу элемента дерева.
            if (a.type < b.type) {
                return 1;
            } else if (a.type > b.type) {
                return -1;
            } else {
                // если мы дошли до сюда, значит оба элемента с одинаковым типом, сортируем по имени
                return a.name > b.name;
            }
        });
    }

    static _commitsHandler(commits) {
        return new Promise( asd => {
            commits = commits.split('\n');

            // приводим данные о коммитах в объект с соответствующими ключами (hash, title, author, date)
            commits = commits.map(item => {
                const result = item.split('^^');

                return {
                    hash: result[0],
                    title: result[1],
                    committer: result[2],
                    date: result[3]
                };
            });

            // commits = GitHelper._sortTreeByType(commits);

            // устанавливаем нужный формат времени
            commits.map((item) => {
                item.date = moment(new Date(item.date)).format(options.timeFormat);
                return item;
            });

            resolve(commits);
        })
    }

    static getAllCommitsOfBranch(branch) {
        return new Promise((resolve, reject) => {
            exec(`cd ${path} && git log ${branch} --pretty=format:"%h^^ %s^^ %cn^^ %cd"`, (error, commits, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                commits = commits.split('\n');

                // приводим данные о коммитах в объект с соответствующими ключами (hash, title, author, date)
                commits = commits.map(item => {
                    const result = item.split('^^');

                    return {
                        hash: result[0],
                        title: result[1],
                        committer: result[2],
                        date: result[3]
                    };
                });

                // commits = GitHelper._sortTreeByType(commits);

                // устанавливаем нужный формат времени
                commits.map((item) => {
                    item.date = moment(new Date(item.date)).format(options.timeFormat);
                    return item;
                });

                resolve(commits);
            });
        });
    }

    static getContentTreeByPath(hash, myPath) { // hash or name (branch)
        return new Promise((resolve, reject) => {
            exec(`git ls-tree ${hash}:./${myPath}`, (error, tree, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                // преобразовываем строку в массив, обрезав лишние пробелы
                tree = tree.trim().split('\n');

                tree = tree.map(item => {
                    const result = item.match(/(\d+)\s(\w+)\s(.+?)\t(.+)/);

                    return {
                        accessMode: result[1],
                        type: result[2],
                        hash: result[3],
                        name: result[4]
                    };
                });

                // отсортируем, что бы сначало были все tree, а потом blob объекты
                GitHelper._sortTreeByType(tree);

                resolve(tree);
            });
        });
    }

    static getAllBranches() {
        return new Promise((resolve, reject) => {
            fs.readdir(`${path}/.git/refs/heads`, (err, files) => {
                if (err) {
                    reject(err);
                }

                resolve(files);
            });
        });
    }

    static readFile(readPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(readPath, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }

    static getBlobContent(hash, myPath) {
        return new Promise((resolve, reject) => {
            exec(`git show ${hash}:./${myPath}`, {maxBuffer: 500 * 1024}, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                resolve(stdout);
            });
        });
    }

    static getDefaultBranch() {
        return new Promise((resolve, reject) => {
            exec('git rev-parse --abbrev-ref HEAD', (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                resolve(stdout.trim());
            });
        });
    }
}
