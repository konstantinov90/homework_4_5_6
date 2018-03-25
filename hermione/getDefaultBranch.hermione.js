const assert = require('chai').assert;

describe('1. Ветка по умолчанию', () => {

    // в поле defaultBranch будет находится конкретная ветка
    it('роутер должен переключить url "/" на "/defaultBranch"', function () {
        return this.browser
            .url('/')
            .getUrl()
            .then((url) => url.match(/.+\/(\w+)/)[1])
            .then((branch) => {
                assert.ok(branch, 'Redirect на "/defaultBranch" не выполнен');
            });
    });

    it('должна быть выделена цветом', function () {
        return this.browser
            .url('/')
            .isExisting('.nav__row_active')
            .then((exist) => {
                assert.ok(exist, 'Ветка не выделена');
            });
    });

    it('имеет в файловом дереве не меньше 1 элемента', function () {
        return this.browser
            .elements('.content__tree-row')
            .then(elements => {
                const length = elements.value.length;
                assert.isAtLeast(length, 1, 'Отсутствуют элементы дерева');
            });
    });

    it('имеет кол-во комитов не меньше 1', function () {
        return this.browser
            .elements('.content__commits-row')
            .then(elements => {
                const length = elements.value.length;

                assert.isAtLeast(length, 1, 'Комиты отсутствуют');
            });
    });
});
