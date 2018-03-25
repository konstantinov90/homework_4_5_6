import GitHandler from '../../backend/GitHandler';
import chai from 'chai';

const assert = chai.assert;
const _contentTreeHandler = GitHandler._contentTreeHandler;

const inputData = `040000 tree bb6cfab36315e63feb5550dc0447259fb8fab5d3\tbin
040000 tree 1ded23484990d08ac7a4eab7c065bb7afbc8631a\tfrontend
040000 tree 27905a6d5ab65ac5b427823313df0ce1094fa0fb\tbackend`;

const result = [
    {
        accessMode: '040000',
        type: 'tree',
        hash: '27905a6d5ab65ac5b427823313df0ce1094fa0fb',
        name: 'backend'
    },
    {
        accessMode: '040000',
        type: 'tree',
        hash: 'bb6cfab36315e63feb5550dc0447259fb8fab5d3',
        name: 'bin'
    },
    {
        accessMode: '040000',
        type: 'tree',
        hash: '1ded23484990d08ac7a4eab7c065bb7afbc8631a',
        name: 'frontend'
    }
];

describe('_contentTreeHandler', function () {
    it('корректно парсит входящую строку', function () {
        assert.deepEqual(_contentTreeHandler(inputData), result);
    });
});
