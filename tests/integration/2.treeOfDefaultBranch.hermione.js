const assert = require('chai').assert;
const randomInteger = require('./Helper').randomInteger;

describe('2. Работа с деревом файлов в ветке по умолчанию', () => {

    it('отображается корректный список файлов и папок поддиректории', function () {
        return this.browser
            .url('/')
            // .elements('.content__row-folder')
            .getAttribute('.content__row-folder .content__tree-item', 'href')
            .then((href) => {
                // будем переходить в случайную папку
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)
            .then(() => {
                return Promise.all([
                    this.browser.elements('.content__tree-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Отсутствуют элементы поддерева');
                        }),
                    this.browser.elements('.content__commits-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Комиты отсутствуют');
                        }),
                ])
            })
            .getAttribute('.content__tree-back', 'href')
            .then(this.browser.url)
            .then(() => {
                return Promise.all([
                    this.browser.elements('.content__tree-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Отсутствуют элементы дерева');
                        }),
                    this.browser.elements('.content__commits-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Комиты отсутствуют');
                        }),
                ])
            })
    });
});
