import FS from './FS';
import moment from 'moment';
import GitCLI from './GitCLI';

import config from '../config';
moment.locale(config.timeLocale || 'ru');
const path = process.env.ROOT;

export default class GitHandler {

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
        commits = commits.split('\n');

        // приводим данные о коммитах в объект с соответствующими ключами (hash, title, author, date)
        commits = commits.map(item => {
            const result = item.split('^^^');

            return {
                hash: result[0],
                title: result[1],
                committer: result[2],
                date: result[3]
            };
        });

        // устанавливаем нужный формат времени
        commits.map((item) => {
            item.date = moment(new Date(item.date)).format(config.timeFormat);
            return item;
        });

        return commits;
    }

    static _contentTreeHandler(tree) {
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
        GitHandler._sortTreeByType(tree);
        return tree;
    }

    static getAllCommitsOfBranch(branch) {
        const command = `cd ${path} && git log ${branch} --pretty=format:"%h^^^%s^^^%cn^^^%cd"`;

        return Promise.resolve(branch)
            .then(() => GitCLI.command(command))
            .then(GitHandler._commitsHandler);
    }

    static getContentTreeByPath(hash, myPath) { // hash или имя ветки
        const command = `git ls-tree ${hash}:./${myPath}`;

        return Promise.resolve()
            .then(() => GitCLI.command(command))
            .then(GitHandler._contentTreeHandler);
    }

    static getAllBranches() {
        const resultPath = `${path}.git/refs/heads`;

        return FS.readDir(resultPath);
    }

    static getBlobContent(hash, myPath) {
        const command = `git show ${hash}:./${myPath}`;
        const options = {maxBuffer: 500 * 1024};

        return Promise.resolve()
            .then(() => GitCLI.command(command, options));
    }

    static getDefaultBranch() {
        const command = 'git rev-parse --abbrev-ref HEAD';

        return Promise.resolve()
            .then(() => GitCLI.command(command))
            .then((result) => result.trim());
    }
}
