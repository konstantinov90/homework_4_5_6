import GitHandler from '../../backend/GitHandler';
import chai from 'chai';
import options from '../../options';
const {timeFormat = 'LLL', timeLocale = 'ru'} = options;

import moment from 'moment';
moment.locale(timeLocale);

const assert = chai.assert;
const _commitsHandler = GitHandler._commitsHandler;

const inputData = `582f0fa^^^second commit^^^klester^^^Sat Mar 24 00:09:56 2018 +0300
b64a411^^^first commit^^^klester^^^Fri Mar 23 22:14:45 2018 +0300`;

const result = [
    {
        hash: '582f0fa',
        title: 'second commit',
        committer: 'klester',
        date: moment(new Date('Sat Mar 24 00:09:56 2018 +0300')).format(timeFormat)
    },
    {
        hash: 'b64a411',
        title: 'first commit',
        committer: 'klester',
        date: moment(new Date('Fri Mar 23 22:14:45 2018 +0300')).format(timeFormat)
    }
];

describe('_commitsHandler', function () {

    it('корректно парсит входящую строку', function () {
        assert.deepEqual(_commitsHandler(inputData), result);
    });
});
