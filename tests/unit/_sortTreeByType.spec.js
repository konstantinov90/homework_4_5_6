import GitHandler from '../../backend/GitHandler';
import chai from 'chai';

const assert = chai.assert;
const _sortTreeByType = GitHandler._sortTreeByType;

const inputData = [
    {
        accessMode: '100644',
        type: 'blob',
        hash: '6d850cf3b940169caa123a4753167b245f309351',
        name: '.gitignore'
    },
    {
        accessMode: '040000',
        type: 'tree',
        hash: '1ded23484990d08ac7a4eab7c065bb7afbc8631a',
        name: 'frontend'
    },
    {
        accessMode: '100644',
        type: 'blob',
        hash: '1d9bd09ddede560a601d8b5549ddc799af4c8a21',
        name: 'favicon.ico'
    },
];

const result = [
    {
        accessMode: '040000',
        type: 'tree',
        hash: '1ded23484990d08ac7a4eab7c065bb7afbc8631a',
        name: 'frontend'
    },
    {
        accessMode: '100644',
        type: 'blob',
        hash: '6d850cf3b940169caa123a4753167b245f309351',
        name: '.gitignore'
    },
    {
        accessMode: '100644',
        type: 'blob',
        hash: '1d9bd09ddede560a601d8b5549ddc799af4c8a21',
        name: 'favicon.ico'
    },
];

describe('_contentTreeHandler', function () {
    it('правильно сортирует массив', function () {
        assert.deepEqual(_sortTreeByType(inputData), result);
    });
});
