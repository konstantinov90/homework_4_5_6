import GitHelper from '../../backend/GitHandler';
import chai from 'chai';
import options from '../../options';
const {timeFormat = 'LLL', timeLocale = 'ru', myPath} = options;

import moment from 'moment';
moment.locale(timeLocale);

const assert = chai.assert;
const getAllCommitsOfBranch = GitHelper.getAllCommitsOfBranch;

const inputData = `582f0fa, second commit, klester, Sat Mar 24 00:09:56 2018 +0300
b64a411, first commit, klester, Fri Mar 23 22:14:45 2018 +0300`;

// const result = [
//     {
//         hash: '582f0fa',
//         title: 'second commit',
//         committer: 'klester',
//         date: moment(new Date('Sat Mar 24 00:09:56 2018 +0300')).format(timeFormat)
//     },
//     {
//         hash: 'b64a411',
//         title: 'first commit',
//         committer: 'klester',
//         date: moment(new Date('Fri Mar 23 22:14:45 2018 +0300')).format(timeFormat)
//     }
// ];

describe('getAllCommitsOfBranch', function () {

    it('Получает список комитов ветки', function (done) {
        // assert.include(getAllCommitsOfBranch(inputData), result);
        Promise.resolve()
            .then(() => getAllCommitsOfBranch(inputData, myPath))
            .then((data) => {
                assert.include(getAllCommitsOfBranch(data), data);
                done();
            });
        // console.log(getAllCommitsOfBranch(inputData, myPath));
    });
});
