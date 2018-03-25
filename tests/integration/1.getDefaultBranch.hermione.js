const assert = require('chai').assert;

describe('1. Ветка по умолчанию', () => {

    // в поле defaultBranch будет находится конкретная ветка
    it('роутер должен переключить url "/" на "/defaultBranch"', function () {
        return this.browser
            .url('/')
            // определяем, осуществлен ли редирект на ветку по умолчанию,
            // для этого выдергиваем содержимое в скобках "/(branchName)"
            .getUrl()
            .then((url) => url.match(/.+\/(\w+)/)[1])
            .then((branch) => {
                assert.ok(branch, 'Redirect на "/defaultBranch" не выполнен');
            })
            // на странице должнена быть выделена строка текущей ветки другим цветом
            .isExisting('.nav__row_active')
            .then((exist) => {
                assert.ok(exist, 'Ветка не выделена');
            })
            // ветка имеет в файловом дереве не меньше 1 элемента
            .elements('.content__tree-row')
            .then(elements => {
                const length = elements.value.length;
                assert.isAtLeast(length, 1, 'Отсутствуют элементы дерева');
            })
            // ветка имеет кол-во комитов не меньше 1
            .elements('.content__commits-row')
            .then(elements => {
                const length = elements.value.length;

                assert.isAtLeast(length, 1, 'Комиты отсутствуют');
            });
    });
});
