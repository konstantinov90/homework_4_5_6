import getAllBranches from '../common/getAllBranches';
import transformStringCommitsToArray from '../common/transformStringCommitsToArray';
import transformStringTreeToArray from '../common/transformStringTreeToArray';
import getAllCommitsOfBranch from '../common/getAllCommitsOfBranch';

import getContentTreeByPath from '../common/getContentTreeByPath';
import readFile from '../common/readFile';

import sortTreeByType from '../common/sortTreeByType';
import moment from 'moment';
const path = process.env.ROOT;

import options from '../../options';
moment.locale(options.timeLocale || 'ru');

const branchRouter = (req, res) => {
    const {branch} = req.params;
    let allBranches;

    Promise.resolve()
        .then(getAllBranches) // получаем список всех существующих веток
        .then((branches) => {
            allBranches = branches; // сохраняем в переменной, что бы не тащить её через промисы

            // если не существует запрошенная ветка, то выкидываем ошибку и попадаем в catch
            const isExist = branches.includes(branch);

            if (isExist) {
                return readFile(`${path}/.git/refs/heads/${branch}`);
            } else {
                return Promise.reject(new Error('not exist'));
            }
        })
        .then(() => {
            return Promise.all([
                getAllCommitsOfBranch(branch)
                    .then(transformStringCommitsToArray),

                // здесь по hashBranch достается список содержимого ветки (tree, parent, и тд)
                // getHashTreeByHashBranch(hashBranch)
                getContentTreeByPath(branch, '/')
                    .then(transformStringTreeToArray)
            ])
                .then(([commits, tree]) => ({tree, commits}));
        })
        .then(({tree, commits}) => {
            tree = sortTreeByType(tree);

            // применяем нужный формат даты
            commits.map( (item)=> {
                item.date = moment(new Date(item.date)).format(options.timeFormat);
                return item;
            });

            res.render('branch', {branch, branches: allBranches, tree, commits});
        })
        .catch((e) => {
            const message = e.message;

            if (message === 'not exist') {
                res.send('NOT FOUND');
            } else {
                console.log(message);
            }
        });
};

export default branchRouter;
