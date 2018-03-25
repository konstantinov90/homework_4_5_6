const assert = require('chai').assert;
const randomInteger = require('./Helper').randomInteger;

describe('4. Дерево файлов комита', () => {

    it('отображается корректно', function () {
        return this.browser
            .url('/')
            .getAttribute('.content__commit-link', 'href')
            .then((href) => {
                // будем переходить по случайному комиту
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)
            .isExisting('.content__tree')
            .then((exist) => {
                assert.ok(exist, 'Отсутствует дерево комита');
            })
            .then(() => {
                Promise.all([
                    this.browser.elements('.content__row-folder')
                        .then(folders => folders),
                    this.browser.elements('.content__row-blob')
                        .then(blobs => blobs),
                ])
                    .then(([folders, blobs]) => {
                        const countElements = folders.value.length + blobs.value.length;
                        assert.isAtLeast(countElements, 1, 'Нет элементов в дереве комита');
                    });
            })
            .getAttribute('.content__row-folder .content__tree-item', 'href')
            .then((href) => {
                // будем переходить по случайному комиту
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url) // перешли в какой-то каталог комита
            .isExisting('.content__tree')
            .then((exist) => {
                assert.ok(exist, 'Отсутствует дерево комита');
            })
            .then(() => {
                Promise.all([
                    this.browser.elements('.content__row-folder')
                        .then(folders => folders),
                    this.browser.elements('.content__row-blob')
                        .then(blobs => blobs),
                ])
                    .then(([folders, blobs]) => {
                        const countElements = folders.value.length + blobs.value.length;
                        assert.isAtLeast(countElements, 1, 'Нет элементов в дереве комита');
                    });
            })
            .getAttribute('.content__tree-back', 'href')
            .then(this.browser.url)
            .then((exist) => {
                assert.ok(exist, 'Отсутствует дерево комита');
            })
            .then(() => {
                Promise.all([
                    this.browser.elements('.content__row-folder')
                        .then(folders => folders),
                    this.browser.elements('.content__row-blob')
                        .then(blobs => blobs),
                ])
                    .then(([folders, blobs]) => {
                        const countElements = folders.value.length + blobs.value.length;
                        assert.isAtLeast(countElements, 1, 'Нет элементов в дереве комита');
                    });
            })
    });
});
